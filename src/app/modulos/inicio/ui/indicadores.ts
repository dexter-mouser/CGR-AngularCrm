import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CLAVE_ORDEN_INDICADORES } from '../../../config/general';
import { Almacenamiento } from '../../../nucleo/servicios/almacenamiento';
import {
  IDS_INDICADORES,
  TITULOS_INDICADORES,
  moverElemento,
  validarOrdenIndicadores,
  type IdIndicador,
} from '../dominio/panel';
import { Indicador } from './indicador';

interface Arrastre {
  id: IdIndicador;
  pointerId: number;
  inicioX: number;
  inicioY: number;
}

// Espera antes de anunciar un cambio de orden, para que el lector no lo pise al volver el foco
const ESPERA_ANUNCIO_MS = 500;

// Indicadores que se pueden reordenar con el puntero (arrastrando el asa) o con las flechas
@Component({
  selector: 'app-indicadores',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Indicador],
  template: `
    <section aria-labelledby="titulo-indicadores">
      <h2 class="solo-lector" id="titulo-indicadores">Indicadores</h2>
      <p class="solo-lector" id="ayuda-mover">
        Usa las flechas para cambiar su posición o arrástralo con el puntero.
      </p>

      <div class="indicadores" [class.indicadores--arrastrando]="arrastre() !== null" #lista>
        @for (id of orden(); track id) {
          <app-indicador
            [id]="id"
            [attr.data-indicador]="id"
            [arrastrando]="arrastre()?.id === id"
            [esDestino]="destino() === id"
            [style.translate]="arrastre()?.id === id ? desplazamiento() : null"
            (agarrar)="iniciarArrastre(id, $event)"
            (mover)="moverConTeclado(id, $event)"
          />
        }
      </div>

      <p class="solo-lector" role="status">{{ anuncio() }}</p>
    </section>
  `,
  styles: `
    .indicadores {
      display: grid;
      gap: var(--espacio-4);
    }

    @media (width >= 768px) {
      .indicadores {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (width >= 1200px) {
      .indicadores {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    .indicadores--arrastrando,
    .indicadores--arrastrando * {
      cursor: grabbing !important;
    }
  `,
})
export class Indicadores {
  private readonly almacenamiento = inject(Almacenamiento);
  private readonly injector = inject(Injector);
  private readonly lista = viewChild.required<ElementRef<HTMLElement>>('lista');

  protected readonly orden = signal<IdIndicador[]>(this.leerOrden());
  protected readonly arrastre = signal<Arrastre | null>(null);
  protected readonly destino = signal<IdIndicador | null>(null);
  protected readonly desplazamiento = signal('0px 0px');
  protected readonly anuncio = signal('');

  private temporizadorAnuncio: ReturnType<typeof setTimeout> | undefined;
  private terminarArrastre: (() => void) | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.temporizadorAnuncio);
      this.terminarArrastre?.();
    });
  }

  /* Puntero: se arrastra desde el asa; el destino es el indicador bajo el puntero */
  protected iniciarArrastre(id: IdIndicador, evento: PointerEvent): void {
    if (evento.button !== 0 || this.arrastre() !== null) return;
    const asa = evento.currentTarget as HTMLElement;
    evento.preventDefault();
    asa.setPointerCapture(evento.pointerId);

    this.arrastre.set({ id, pointerId: evento.pointerId, inicioX: evento.clientX, inicioY: evento.clientY });
    this.desplazamiento.set('0px 0px');

    const alMover = (e: PointerEvent) => {
      const arrastre = this.arrastre();
      if (!arrastre || e.pointerId !== arrastre.pointerId) return;
      this.desplazamiento.set(`${e.clientX - arrastre.inicioX}px ${e.clientY - arrastre.inicioY}px`);
      this.destino.set(this.buscarDestino(e.clientX, e.clientY, arrastre.id));
    };
    const alSoltar = (e: PointerEvent) => {
      if (e.pointerId !== this.arrastre()?.pointerId) return;
      const destino = this.destino();
      this.terminarArrastre?.();
      if (destino) this.moverA(id, this.orden().indexOf(destino));
    };
    const alCancelar = () => this.terminarArrastre?.();
    const alPulsarTecla = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      this.terminarArrastre?.();
      this.anunciar('Movimiento cancelado');
    };

    asa.addEventListener('pointermove', alMover);
    asa.addEventListener('pointerup', alSoltar);
    asa.addEventListener('pointercancel', alCancelar);
    asa.addEventListener('lostpointercapture', alCancelar);
    document.addEventListener('keydown', alPulsarTecla);

    this.terminarArrastre = () => {
      asa.removeEventListener('pointermove', alMover);
      asa.removeEventListener('pointerup', alSoltar);
      asa.removeEventListener('pointercancel', alCancelar);
      asa.removeEventListener('lostpointercapture', alCancelar);
      document.removeEventListener('keydown', alPulsarTecla);
      this.terminarArrastre = null;
      this.arrastre.set(null);
      this.destino.set(null);
      this.desplazamiento.set('0px 0px');
    };
  }

  /* Teclado: las flechas mueven el indicador una posición; el foco se queda en su asa */
  protected moverConTeclado(id: IdIndicador, direccion: -1 | 1): void {
    const posicion = this.orden().indexOf(id);
    this.moverA(id, posicion + direccion);
    afterNextRender(
      () => this.lista().nativeElement.querySelector<HTMLElement>(`[data-mover="${id}"]`)?.focus(),
      { injector: this.injector },
    );
  }

  private moverA(id: IdIndicador, destino: number): void {
    const desde = this.orden().indexOf(id);
    if (destino < 0 || destino >= this.orden().length || destino === desde) return;
    this.orden.set(moverElemento(this.orden(), desde, destino));
    this.almacenamiento.guardar(CLAVE_ORDEN_INDICADORES, JSON.stringify(this.orden()));
    this.anunciar(`${TITULOS_INDICADORES[id]}: posición ${destino + 1} de ${this.orden().length}`);
  }

  // Busca por posición en pantalla (no por el elemento bajo el puntero, que es el asa capturada)
  private buscarDestino(x: number, y: number, arrastrado: IdIndicador): IdIndicador | null {
    const tarjetas = this.lista().nativeElement.querySelectorAll<HTMLElement>('[data-indicador]');
    for (const tarjeta of tarjetas) {
      const id = tarjeta.dataset['indicador'] as IdIndicador;
      if (id === arrastrado) continue;
      const caja = tarjeta.getBoundingClientRect();
      if (x >= caja.left && x <= caja.right && y >= caja.top && y <= caja.bottom) return id;
    }
    return null;
  }

  private anunciar(mensaje: string): void {
    clearTimeout(this.temporizadorAnuncio);
    this.anuncio.set('');
    this.temporizadorAnuncio = setTimeout(() => this.anuncio.set(mensaje), ESPERA_ANUNCIO_MS);
  }

  private leerOrden(): IdIndicador[] {
    const guardado = this.almacenamiento.leer(CLAVE_ORDEN_INDICADORES);
    if (guardado === null) return [...IDS_INDICADORES];
    try {
      return validarOrdenIndicadores(JSON.parse(guardado)) ?? [...IDS_INDICADORES];
    } catch (error) {
      console.error('Orden de indicadores guardado no válido', error);
      return [...IDS_INDICADORES];
    }
  }
}
