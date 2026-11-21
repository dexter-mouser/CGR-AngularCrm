import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { UMBRAL_ESQUELETO_MS } from '../../config/general';
import { iniciarActividad } from '../esqueleto/actividad';
import { EsqueletoPagina } from '../esqueleto/esqueleto-pagina';
import { MenuLateral } from './menu-lateral/menu-lateral';
import { MenuSuperior } from './menu-superior/menu-superior';

// Estructura de las páginas internas: menú lateral, cabecera con migas y contenido
@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MenuSuperior, MenuLateral, EsqueletoPagina],
  template: `
    <button class="saltar-contenido" type="button" (click)="contenido.focus()">
      Saltar al contenido
    </button>
    <app-menu-lateral />
    <div class="layout__columna">
      <app-menu-superior />
      <main class="layout__contenido" tabindex="-1" #contenido>
        <div class="contenedor">
          @if (cargandoPagina()) {
            <app-esqueleto-pagina />
          }
          <div class="layout__pagina" [hidden]="cargandoPagina()">
            <router-outlet />
          </div>
        </div>
      </main>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      min-block-size: 100dvh;
    }

    .layout__columna {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-inline-size: 0;
    }

    .layout__contenido {
      flex: 1;
      padding: var(--espacio-6) var(--espacio-6) var(--espacio-8);

      &:focus {
        outline: none;
      }
    }

    /* Enlace para teclado, visible solo al recibir foco */
    .saltar-contenido {
      position: absolute;
      inset-block-start: var(--espacio-2);
      inset-inline-start: var(--espacio-2);
      z-index: 20;
      padding: var(--espacio-2) var(--espacio-3);
      font-weight: 600;
      color: var(--color-acento-suave-texto);
      background-color: var(--color-acento-suave);
      border: 1px solid var(--color-acento-suave-borde);
      border-radius: var(--radio);
      translate: 0 -200%;

      &:focus {
        translate: 0;
      }
    }

    /* Celular: espacio para la barra inferior */
    @media (width < 768px) {
      .layout__contenido {
        padding: var(--espacio-4) var(--espacio-4)
          calc(var(--alto-barra-inferior) + var(--espacio-6));
      }
    }
  `,
})
export class Layout {
  protected readonly cargandoPagina = signal(false);
  private temporizador: ReturnType<typeof setTimeout> | undefined;
  private terminarActividad: (() => void) | null = null;

  constructor() {
    // Muestra el esqueleto y la barra de carga solo si el cambio de página tarda más que el umbral
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((evento) => {
        if (evento instanceof NavigationStart) {
          this.terminarCarga();
          this.temporizador = setTimeout(() => {
            this.terminarActividad = iniciarActividad();
            this.cargandoPagina.set(true);
          }, UMBRAL_ESQUELETO_MS);
        } else if (
          evento instanceof NavigationEnd ||
          evento instanceof NavigationCancel ||
          evento instanceof NavigationError
        ) {
          this.terminarCarga();
        }
      });
  }

  private terminarCarga(): void {
    clearTimeout(this.temporizador);
    this.terminarActividad?.();
    this.terminarActividad = null;
    this.cargandoPagina.set(false);
  }
}
