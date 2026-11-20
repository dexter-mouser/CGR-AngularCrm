import { computed, signal } from '@angular/core';
import { MINIMO_ESQUELETO_MS, UMBRAL_ESQUELETO_MS } from '../../config/general';
import { esperar } from '../utilidades/esperar';

/*
 * Estado de carga de un bloque:
 * - esperando: pidió los datos, pero aún no pasa el umbral (el esqueleto reserva espacio sin verse)
 * - cargando: el esqueleto se ve
 * - listo / error: terminó
 */
export type EstadoCarga = 'esperando' | 'cargando' | 'listo' | 'error';

// Carga los datos de un bloque y decide cuándo mostrar su esqueleto, para evitar parpadeos
export class Carga<T> {
  readonly estado = signal<EstadoCarga>('esperando');
  readonly datos = signal<T | undefined>(undefined);

  readonly estaCargando = computed(() => {
    const estado = this.estado();
    return estado === 'esperando' || estado === 'cargando';
  });
  readonly esqueletoVisible = computed(() => this.estado() === 'cargando');

  private intento = 0;

  constructor(private readonly obtener: () => Promise<T>) {}

  async cargar(): Promise<void> {
    const intentoActual = ++this.intento;
    let visibleDesde: number | null = null;

    this.estado.set('esperando');
    const temporizador = setTimeout(() => {
      visibleDesde = performance.now();
      this.estado.set('cargando');
    }, UMBRAL_ESQUELETO_MS);

    try {
      const datos = await this.obtener();
      await this.completarMinimo(temporizador, visibleDesde);
      if (intentoActual !== this.intento) return;
      this.datos.set(datos);
      this.estado.set('listo');
    } catch (error) {
      console.error('No se pudieron cargar los datos', error);
      await this.completarMinimo(temporizador, visibleDesde);
      if (intentoActual !== this.intento) return;
      this.estado.set('error');
    }
  }

  // Si el esqueleto llegó a verse, lo mantiene el tiempo mínimo
  private async completarMinimo(
    temporizador: ReturnType<typeof setTimeout>,
    visibleDesde: number | null,
  ): Promise<void> {
    clearTimeout(temporizador);
    if (visibleDesde === null) return;
    const restante = MINIMO_ESQUELETO_MS - (performance.now() - visibleDesde);
    if (restante > 0) await esperar(restante);
  }
}
