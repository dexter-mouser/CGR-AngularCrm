import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Carga } from '../../../nucleo/esqueleto/carga';
import { Esqueleto } from '../../../nucleo/esqueleto/esqueleto';
import { ZonaCarga } from '../../../nucleo/esqueleto/zona-carga';
import { EstadoError } from '../../../nucleo/estados/estado-error';
import { ConsultarPanel } from '../aplicacion/consultar-panel';
import { saludoSegunHora } from '../dominio/panel';

// Encabezado con saludo y sucursal; el borde de acento y el patrón se ven también mientras carga
@Component({
  selector: 'app-encabezado-inicio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Esqueleto, ZonaCarga, EstadoError],
  template: `
    <section
      class="encabezado tarjeta"
      aria-labelledby="titulo-inicio"
      [attr.aria-busy]="carga.estaCargando()"
    >
      <span class="encabezado__patron" aria-hidden="true"></span>
      <p class="encabezado__etiqueta">Inicio</p>

      @switch (carga.estado()) {
        @case ('listo') {
          @if (carga.datos(); as datos) {
            <h1 class="encabezado__saludo" id="titulo-inicio">
              {{ saludo }}, {{ datos.nombreUsuario }}
            </h1>
            <p class="encabezado__resumen">Resumen del día en {{ datos.sucursal }}.</p>
          }
        }
        @case ('error') {
          <h1 class="encabezado__saludo" id="titulo-inicio">{{ saludo }}</h1>
          <app-estado-error
            mensaje="No se pudo cargar la sucursal."
            (reintentar)="carga.cargar()"
          />
        }
        @default {
          <app-zona-carga [visible]="carga.esqueletoVisible()">
            <h1 class="encabezado__saludo" id="titulo-inicio">
              <span class="solo-lector">Inicio</span>
              <app-esqueleto ancho="min(22rem, 85%)" />
            </h1>
            <p class="encabezado__resumen">
              <app-esqueleto ancho="min(15rem, 65%)" />
            </p>
          </app-zona-carga>
        }
      }
    </section>
  `,
  styles: `
    .encabezado {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--espacio-1);
      padding: var(--espacio-6);
      padding-inline-end: min(40%, 280px);
      overflow: hidden;
      border-inline-start: 4px solid var(--color-acento);
    }

    .encabezado__etiqueta {
      font-size: var(--texto-xs);
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-acento);
    }

    .encabezado__resumen {
      color: var(--color-texto-secundario);
    }

    /* Patrón decorativo: círculo y puntos en acento suave, desvanecidos hacia el texto */
    .encabezado__patron {
      position: absolute;
      inset-block: 0;
      inset-inline-end: 0;
      inline-size: min(40%, 280px);
      background:
        radial-gradient(circle at 100% 0, var(--color-acento-suave) 0 42%, transparent 42.5%),
        radial-gradient(
            color-mix(in oklab, var(--color-acento) 30%, transparent) 1.5px,
            transparent 2px
          )
          0 0 / 14px 14px;
      mask-image: linear-gradient(to left, black 40%, transparent);
    }

    @media (width < 768px) {
      .encabezado {
        padding: var(--espacio-4);
        padding-inline-end: var(--espacio-4);
      }

      .encabezado__patron {
        inline-size: 35%;
        opacity: 0.6;
      }
    }

    @media (forced-colors: active) {
      .encabezado__patron {
        display: none;
      }
    }
  `,
})
export class EncabezadoInicio {
  private readonly consultar = inject(ConsultarPanel);

  protected readonly saludo = saludoSegunHora(new Date().getHours());
  protected readonly carga = new Carga(() => this.consultar.encabezado());

  constructor() {
    this.carga.cargar();
  }
}
