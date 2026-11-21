import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

interface Miga {
  etiqueta: string;
  ruta: string;
}

const MIGA_INICIO: Miga = { etiqueta: 'Inicio', ruta: '/inicio' };

// Migas de pan: Inicio y la página actual (la última es la página donde estás)
@Component({
  selector: 'app-migas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <nav class="migas" aria-label="Migas de pan">
      <ol>
        @for (miga of migas(); track miga.ruta; let ultima = $last) {
          <li>
            <a
              [routerLink]="miga.ruta"
              [attr.aria-current]="ultima ? 'page' : null"
              [class.migas__actual]="ultima"
            >
              {{ miga.etiqueta }}
            </a>
          </li>
        }
      </ol>
    </nav>
  `,
  styles: `
    .migas {
      min-inline-size: 0;
    }

    ol {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--espacio-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    // El separador es decorativo: el texto alternativo vacío lo deja fuera del lector de pantalla
    li + li::before {
      content: '/' / '';
      margin-inline-end: var(--espacio-2);
      color: var(--color-texto-secundario);
    }

    a {
      color: var(--color-texto-secundario);
      text-decoration: none;
      white-space: nowrap;
      transition: color var(--duracion-corta) ease;

      &:hover {
        color: var(--color-texto);
        text-decoration: underline;
      }
    }

    .migas__actual {
      font-weight: 600;
      color: var(--color-titulo);
    }

    @media (forced-colors: active) {
      .migas__actual {
        text-decoration: underline;
      }
    }
  `,
})
export class Migas {
  private readonly router = inject(Router);

  protected readonly migas = toSignal(
    this.router.events.pipe(
      filter((evento) => evento instanceof NavigationEnd),
      map(() => this.calcular()),
    ),
    { initialValue: this.calcular() },
  );

  private calcular(): Miga[] {
    let ruta: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
    while (ruta.firstChild) ruta = ruta.firstChild;

    const etiqueta = ruta.data['miga'] as string | undefined;
    const url = '/' + ruta.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)).join('/');
    if (!etiqueta || url === MIGA_INICIO.ruta) return [MIGA_INICIO];
    return [MIGA_INICIO, { etiqueta, ruta: url }];
  }
}
