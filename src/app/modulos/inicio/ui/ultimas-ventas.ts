import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Carga } from '../../../nucleo/esqueleto/carga';
import { Esqueleto } from '../../../nucleo/esqueleto/esqueleto';
import { ZonaCarga } from '../../../nucleo/esqueleto/zona-carga';
import { EstadoError } from '../../../nucleo/estados/estado-error';
import { EstadoVacio } from '../../../nucleo/estados/estado-vacio';
import { formatearMoneda } from '../../../nucleo/utilidades/formato';
import { ConsultarPanel } from '../aplicacion/consultar-panel';
import { iniciales } from '../dominio/panel';

const FILAS_ESQUELETO = [1, 2, 3, 4, 5];

// Lista de las últimas ventas con avatar de iniciales y monto a la derecha
@Component({
  selector: 'app-ultimas-ventas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Esqueleto, ZonaCarga, EstadoError, EstadoVacio],
  template: `
    <section class="panel tarjeta" aria-labelledby="titulo-ultimas" [attr.aria-busy]="carga.estaCargando()">
      <h2 class="panel__titulo" id="titulo-ultimas">Últimas ventas</h2>

      <div class="panel__contenido">
        @switch (carga.estado()) {
          @case ('listo') {
            @let ventas = carga.datos() ?? [];
            @if (ventas.length === 0) {
              <app-estado-vacio mensaje="Aún no hay ventas registradas" icono="ventas" />
            } @else {
              <ul class="ventas">
                @for (venta of ventas; track venta.id) {
                  <li class="venta">
                    <span class="venta__avatar" aria-hidden="true">{{ iniciales(venta.cliente) }}</span>
                    <span class="venta__texto">
                      <span class="venta__cliente">{{ venta.cliente }}</span>
                      <span class="venta__detalle">{{ venta.detalle }}</span>
                    </span>
                    <span class="venta__monto">{{ formatearMoneda(venta.monto) }}</span>
                  </li>
                }
              </ul>
            }
          }
          @case ('error') {
            <app-estado-error
              mensaje="No se pudieron cargar las últimas ventas."
              (reintentar)="carga.cargar()"
            />
          }
          @default {
            <app-zona-carga [visible]="carga.esqueletoVisible()">
              <div class="ventas">
                @for (fila of filasEsqueleto; track fila) {
                  <div class="venta">
                    <app-esqueleto variante="circulo" ancho="36px" alto="36px" />
                    <span class="venta__texto">
                      <app-esqueleto class="venta__cliente" ancho="65%" />
                      <app-esqueleto class="venta__detalle" ancho="40%" />
                    </span>
                    <app-esqueleto class="venta__monto" ancho="4.5rem" />
                  </div>
                }
              </div>
            </app-zona-carga>
          }
        }
      </div>
    </section>
  `,
  styleUrls: ['./panel.scss'],
  styles: `
    .ventas {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .venta {
      display: flex;
      align-items: center;
      gap: var(--espacio-3);
      padding-block: var(--espacio-2);

      & + & {
        border-block-start: var(--borde);
      }
    }

    .venta__avatar {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      inline-size: 36px;
      block-size: 36px;
      font-size: var(--texto-xs);
      font-weight: 600;
      color: var(--color-acento);
      background-color: var(--color-acento-suave);
      border-radius: 50%;
    }

    .venta__texto {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-inline-size: 0;
    }

    .venta__cliente {
      overflow: hidden;
      font-weight: 600;
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .venta__detalle {
      font-size: var(--texto-sm);
      line-height: 1.5;
      color: var(--color-texto-secundario);
    }

    .venta__monto {
      flex-shrink: 0;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      line-height: 1.5;
      text-align: end;
    }
  `,
})
export class UltimasVentas {
  private readonly consultar = inject(ConsultarPanel);

  protected readonly carga = new Carga(() => this.consultar.ultimasVentas());
  protected readonly filasEsqueleto = FILAS_ESQUELETO;
  protected readonly iniciales = iniciales;
  protected readonly formatearMoneda = formatearMoneda;

  constructor() {
    this.carga.cargar();
  }
}
