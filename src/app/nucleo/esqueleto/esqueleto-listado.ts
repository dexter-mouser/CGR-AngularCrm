import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Esqueleto } from './esqueleto';
import { ZonaCarga } from './zona-carga';

// Líneas de esqueleto mientras carga un listado
@Component({
  selector: 'app-esqueleto-listado',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Esqueleto, ZonaCarga],
  template: `
    <div class="esqueleto-listado">
      <app-zona-carga [visible]="visible()">
        @for (fila of filasLista(); track fila) {
          <app-esqueleto [ancho]="fila % 3 === 2 ? '60%' : '100%'" />
        }
      </app-zona-carga>
    </div>
  `,
  styles: `
    .esqueleto-listado {
      display: flex;
      flex-direction: column;
      gap: var(--espacio-2);
      margin-block-start: var(--espacio-3);
    }
  `,
})
export class EsqueletoListado {
  readonly filas = input(4);
  readonly visible = input(true);
  protected readonly filasLista = computed(() => Array.from({ length: this.filas() }, (_, i) => i));
}
