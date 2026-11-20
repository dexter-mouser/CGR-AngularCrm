import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Esqueleto } from './esqueleto';
import { ZonaCarga } from './zona-carga';

// Página de esqueleto mientras se descarga un módulo
@Component({
  selector: 'app-esqueleto-pagina',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Esqueleto, ZonaCarga],
  template: `
    <div class="esqueleto-pagina" aria-busy="true">
      <app-zona-carga texto="Cargando página…">
        <app-esqueleto class="esqueleto-pagina__titulo" ancho="min(40%, 240px)" />
        <app-esqueleto ancho="60%" />
        <app-esqueleto variante="rectangulo" alto="160px" />
      </app-zona-carga>
    </div>
  `,
  styles: `
    .esqueleto-pagina {
      display: flex;
      flex-direction: column;
      gap: var(--espacio-4);
    }

    .esqueleto-pagina__titulo {
      font-size: var(--texto-xl);
      line-height: 1.2;
    }
  `,
})
export class EsqueletoPagina {}
