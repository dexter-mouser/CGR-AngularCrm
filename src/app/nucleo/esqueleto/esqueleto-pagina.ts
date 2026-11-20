import { ChangeDetectionStrategy, Component } from '@angular/core';

// Página gris animada mientras se carga un módulo
@Component({
  selector: 'app-esqueleto-pagina',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="esqueleto-pagina" role="status">
      <span class="solo-lector">Cargando página…</span>
      <span class="esqueleto esqueleto--titulo" aria-hidden="true"></span>
      <span class="esqueleto esqueleto--linea esqueleto--corta" aria-hidden="true"></span>
      <span class="esqueleto esqueleto--bloque" aria-hidden="true"></span>
    </div>
  `,
  styles: `
    .esqueleto-pagina {
      display: flex;
      flex-direction: column;
      gap: var(--espacio-4);
    }
  `,
})
export class EsqueletoPagina {}
