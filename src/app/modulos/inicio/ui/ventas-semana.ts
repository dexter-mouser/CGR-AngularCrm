import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Carga } from '../../../nucleo/esqueleto/carga';
import { Esqueleto } from '../../../nucleo/esqueleto/esqueleto';
import { ZonaCarga } from '../../../nucleo/esqueleto/zona-carga';
import { EstadoError } from '../../../nucleo/estados/estado-error';
import { EstadoVacio } from '../../../nucleo/estados/estado-vacio';
import { formatearMoneda } from '../../../nucleo/utilidades/formato';
import { ConsultarPanel } from '../aplicacion/consultar-panel';
import { semanaSinVentas, type VentaDia } from '../dominio/panel';

// Alturas del esqueleto de la gráfica (porcentaje del área), variadas para que parezca una gráfica
const ALTURAS_ESQUELETO = [45, 70, 35, 85, 60, 95, 50];

// Altura mínima de una barra con ventas, para que no desaparezca junto a días muy altos
const ALTURA_MINIMA = 3;

// Gráfica de barras de la semana, hecha con HTML y CSS
@Component({
  selector: 'app-ventas-semana',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Esqueleto, ZonaCarga, EstadoError, EstadoVacio],
  template: `
    <section class="panel tarjeta" aria-labelledby="titulo-semana" [attr.aria-busy]="carga.estaCargando()">
      <h2 class="panel__titulo" id="titulo-semana">Ventas de la semana</h2>

      <div class="panel__contenido">
        @switch (carga.estado()) {
          @case ('listo') {
            @if (estaVacia()) {
              <app-estado-vacio
                mensaje="Aún no hay ventas esta semana"
                icono="grafica"
                [accion]="{ texto: 'Registrar venta', ruta: '/ventas' }"
              />
            } @else {
              <ol class="grafica" aria-label="Ventas por día">
                @for (dia of carga.datos(); track dia.dia) {
                  <li class="grafica__columna">
                    <span class="grafica__area">
                      <span
                        class="grafica__barra"
                        [style.block-size.%]="altura(dia)"
                        [attr.title]="formatearMoneda(dia.total)"
                      ></span>
                    </span>
                    <span class="grafica__dia">{{ dia.dia }}</span>
                    <span class="solo-lector">: {{ formatearMoneda(dia.total) }}</span>
                  </li>
                }
              </ol>
            }
          }
          @case ('error') {
            <app-estado-error
              mensaje="No se pudieron cargar las ventas de la semana."
              (reintentar)="carga.cargar()"
            />
          }
          @default {
            <app-zona-carga [visible]="carga.esqueletoVisible()">
              <div class="grafica">
                @for (alto of alturasEsqueleto; track $index) {
                  <div class="grafica__columna">
                    <span class="grafica__area">
                      <app-esqueleto variante="rectangulo" [alto]="alto + '%'" />
                    </span>
                    <app-esqueleto class="grafica__dia" ancho="1.75rem" />
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
    /* Columnas sobre un eje: el área de barras mide lo mismo en datos y en esqueleto */
    .grafica {
      --alto-area: 180px;
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: var(--espacio-2);
      margin: 0;
      padding: 0;
      list-style: none;
      background: linear-gradient(var(--color-borde-campo), var(--color-borde-campo)) 0
        var(--alto-area) / 100% 1px no-repeat;
    }

    .grafica__columna {
      display: grid;
      grid-template-rows: var(--alto-area) auto;
      justify-items: center;
      gap: var(--espacio-2);
    }

    .grafica__area {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      inline-size: 100%;
      block-size: 100%;
    }

    .grafica__barra,
    .grafica__area .esqueleto {
      inline-size: min(70%, 40px);
      border-radius: 6px 6px 0 0;
    }

    .grafica__barra {
      display: block;
      background-color: var(--color-acento);
      transition: block-size 0.3s ease;
    }

    .grafica__dia {
      font-size: var(--texto-xs);
      line-height: 1.5;
      color: var(--color-texto-secundario);
    }
  `,
})
export class VentasSemana {
  private readonly consultar = inject(ConsultarPanel);

  protected readonly carga = new Carga(() => this.consultar.ventasSemana());
  protected readonly alturasEsqueleto = ALTURAS_ESQUELETO;
  protected readonly formatearMoneda = formatearMoneda;

  protected readonly estaVacia = computed(() => semanaSinVentas(this.carga.datos() ?? []));
  private readonly maximo = computed(() => Math.max(0, ...(this.carga.datos() ?? []).map((d) => d.total)));

  constructor() {
    this.carga.cargar();
  }

  protected altura(dia: VentaDia): number {
    const maximo = this.maximo();
    if (maximo <= 0 || dia.total <= 0) return 0;
    return Math.max(ALTURA_MINIMA, (dia.total / maximo) * 100);
  }
}
