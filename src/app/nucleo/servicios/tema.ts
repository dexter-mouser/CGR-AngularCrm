import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { CLAVE_TEMA } from '../../config/general';
import { Almacenamiento } from './almacenamiento';

type Esquema = 'light' | 'dark';
export type PreferenciaTema = 'claro' | 'oscuro' | 'automatico';

const ESQUEMA_DEL_SISTEMA = 'light dark';
const ESQUEMAS_VALIDOS: readonly string[] = ['light', 'dark'];
const ESQUEMA_POR_PREFERENCIA: Record<PreferenciaTema, Esquema | null> = {
  claro: 'light',
  oscuro: 'dark',
  automatico: null,
};

/*
 * Tema claro, oscuro o automático (sigue al sistema).
 * Se guarda en localStorage como 'light' o 'dark'; sin valor guardado es automático.
 * El botón de la cabecera alterna al tema contrario; si coincide con el del sistema, vuelve a automático.
 */
@Injectable({ providedIn: 'root' })
export class Tema {
  private readonly documento = inject(DOCUMENT);
  private readonly almacenamiento = inject(Almacenamiento);

  readonly preferencia = signal<PreferenciaTema>(this.aPreferencia(this.leerGuardado()));

  constructor() {
    // Mantiene el tema igual entre pestañas abiertas
    this.documento.defaultView?.addEventListener('storage', (evento) => {
      if (evento.key !== CLAVE_TEMA) return;
      const guardado = this.leerGuardado();
      this.preferencia.set(this.aPreferencia(guardado));
      this.aplicar(guardado);
    });
  }

  elegir(preferencia: PreferenciaTema): void {
    const esquema = ESQUEMA_POR_PREFERENCIA[preferencia];
    if (esquema === null) this.almacenamiento.borrar(CLAVE_TEMA);
    else this.almacenamiento.guardar(CLAVE_TEMA, esquema);
    this.preferencia.set(preferencia);
    this.aplicar(esquema);
  }

  alternar(): void {
    const objetivo: Esquema = this.esquemaVisible() === 'dark' ? 'light' : 'dark';
    this.elegir(objetivo === this.esquemaDelSistema() ? 'automatico' : this.aPreferencia(objetivo));
  }

  private esquemaVisible(): Esquema {
    return this.leerGuardado() ?? this.esquemaDelSistema();
  }

  private esquemaDelSistema(): Esquema {
    const esOscuro = this.documento.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches;
    return esOscuro ? 'dark' : 'light';
  }

  private leerGuardado(): Esquema | null {
    const valor = this.almacenamiento.leer(CLAVE_TEMA);
    return valor !== null && ESQUEMAS_VALIDOS.includes(valor) ? (valor as Esquema) : null;
  }

  private aPreferencia(esquema: Esquema | null): PreferenciaTema {
    if (esquema === 'light') return 'claro';
    if (esquema === 'dark') return 'oscuro';
    return 'automatico';
  }

  private aplicar(esquema: Esquema | null): void {
    const meta = this.documento.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (meta) meta.content = esquema ?? ESQUEMA_DEL_SISTEMA;
  }
}
