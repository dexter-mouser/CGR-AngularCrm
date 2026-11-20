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
import { UMBRAL_ESQUELETO_PAGINA_MS } from '../../config/general';
import { EsqueletoPagina } from '../esqueleto/esqueleto-pagina';
import { MenuLateral } from './menu-lateral/menu-lateral';
import { MenuSuperior } from './menu-superior/menu-superior';

// Estructura de las páginas internas: menú superior, menú lateral y contenido
@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MenuSuperior, MenuLateral, EsqueletoPagina],
  template: `
    <button class="saltar-contenido" type="button" (click)="contenido.focus()">
      Saltar al contenido
    </button>
    <app-menu-superior />
    <div class="layout__cuerpo">
      <app-menu-lateral />
      <main class="layout__contenido" tabindex="-1" #contenido>
        <div class="contenedor">
          @if (cargandoPagina()) {
            <app-esqueleto-pagina />
          }
          <div [hidden]="cargandoPagina()">
            <router-outlet />
          </div>
        </div>
      </main>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-block-size: 100dvh;
    }

    .layout__cuerpo {
      display: flex;
      flex: 1;
    }

    .layout__contenido {
      flex: 1;
      min-inline-size: 0;
      padding: var(--espacio-6) var(--espacio-4);

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
      border: 0;
      color: var(--color-sobre-acento);
      background-color: var(--color-acento);
      border-radius: var(--radio);
      translate: 0 -200%;

      &:focus {
        translate: 0;
      }
    }

    /* Celular: espacio para la barra inferior */
    @media (width < 768px) {
      .layout__contenido {
        padding-block-end: calc(var(--alto-barra-inferior) + var(--espacio-6));
      }
    }
  `,
})
export class Layout {
  protected readonly cargandoPagina = signal(false);
  private temporizador: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    // Muestra el esqueleto solo si el cambio de página tarda más que el umbral
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((evento) => {
        if (evento instanceof NavigationStart) {
          clearTimeout(this.temporizador);
          this.temporizador = setTimeout(
            () => this.cargandoPagina.set(true),
            UMBRAL_ESQUELETO_PAGINA_MS,
          );
        } else if (
          evento instanceof NavigationEnd ||
          evento instanceof NavigationCancel ||
          evento instanceof NavigationError
        ) {
          clearTimeout(this.temporizador);
          this.cargandoPagina.set(false);
        }
      });
  }
}
