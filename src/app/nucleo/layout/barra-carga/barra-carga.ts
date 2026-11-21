import { ChangeDetectionStrategy, Component } from '@angular/core';
import { hayCargaActiva } from '../../esqueleto/actividad';

// Barra de 2px en el color de acento mientras algo carga (decorativa: los bloques anuncian «Cargando…»)
@Component({
  selector: 'app-barra-carga',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (cargando()) {
      <div class="barra-carga" aria-hidden="true"><span></span></div>
    }
  `,
  styles: `
    :host {
      position: absolute;
      inset-inline: 0;
      inset-block-end: -1px;
      block-size: 2px;
      overflow: hidden;
      pointer-events: none;
    }

    .barra-carga,
    span {
      display: block;
      block-size: 100%;
    }

    span {
      inline-size: 40%;
      background-color: var(--color-acento);
      animation: avance 1.2s var(--curva-suave) infinite;
    }

    @keyframes avance {
      from {
        translate: -100% 0;
      }

      to {
        translate: 250% 0;
      }
    }

    // Sin movimiento: barra fija de lado a lado
    @media (prefers-reduced-motion: reduce) {
      span {
        inline-size: 100%;
        animation: none;
      }
    }

    @media (forced-colors: active) {
      span {
        background-color: Highlight;
      }
    }
  `,
})
export class BarraCarga {
  protected readonly cargando = hayCargaActiva;
}
