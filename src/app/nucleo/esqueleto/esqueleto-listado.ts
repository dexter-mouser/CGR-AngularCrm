import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// Filas grises animadas mientras carga un listado
@Component({
  selector: 'app-esqueleto-listado',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="esqueleto-listado" role="status">
      <span class="solo-lector">Cargando…</span>
      @for (fila of filasLista(); track fila) {
        <span class="esqueleto esqueleto--linea" [class.esqueleto--corta]="fila % 3 === 2" aria-hidden="true"></span>
      }
    </div>
  `,
  styles: `
    .esqueleto-listado {
      display: flex;
      flex-direction: column;
      gap: var(--espacio-3);
      margin-block-start: var(--espacio-3);
    }
  `,
})
export class EsqueletoListado {
  readonly filas = input(4);
  protected readonly filasLista = computed(() => Array.from({ length: this.filas() }, (_, i) => i));
}
