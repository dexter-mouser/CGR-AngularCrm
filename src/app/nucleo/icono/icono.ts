import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NombreIcono =
  | 'inicio'
  | 'inventario'
  | 'ventas'
  | 'salir'
  | 'menu'
  | 'sol'
  | 'luna'
  | 'usuario'
  | 'ojo'
  | 'ojo-tachado'
  | 'alerta'
  | 'copiar'
  | 'check'
  | 'ajustes'
  | 'clientes'
  | 'finanzas'
  | 'herramienta';

// Iconos SVG en línea, decorativos: el texto accesible lo pone quien los usa
@Component({
  selector: 'app-icono',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'icono' },
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }
  `,
  template: `
    <svg
      aria-hidden="true"
      focusable="false"
      [attr.width]="tamano()"
      [attr.height]="tamano()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      @switch (nombre()) {
        @case ('inicio') {
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9v12h14V9" />
          <path d="M10 21v-6h4v6" />
        }
        @case ('inventario') {
          <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
          <path d="M3 8l9 5 9-5" />
          <path d="M12 13v8" />
        }
        @case ('ventas') {
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.5 12h12L22 7H6" />
        }
        @case ('salir') {
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        }
        @case ('menu') {
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M9 4v16" />
        }
        @case ('sol') {
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          />
        }
        @case ('luna') {
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        }
        @case ('usuario') {
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        }
        @case ('ojo') {
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        }
        @case ('ojo-tachado') {
          <path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3 3.9" />
          <path d="M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 5.4-1.6" />
          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
          <path d="M2 2l20 20" />
        }
        @case ('alerta') {
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6" />
          <path d="M12 16.5v.5" />
        }
        @case ('copiar') {
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
        }
        @case ('check') {
          <path d="M5 12.5 10 17.5 19 7" />
        }
        @case ('ajustes') {
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"
          />
        }
        @case ('clientes') {
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" />
          <path d="M18.5 14.5a6.5 6.5 0 0 1 3 5.5" />
        }
        @case ('finanzas') {
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 10h19" />
          <path d="M6.5 15h4" />
        }
        @case ('herramienta') {
          <path d="M14.7 6.3a4 4 0 0 0 5 5L21 10a5.5 5.5 0 0 1-7.4 5.2L7 21.8a2.1 2.1 0 0 1-3-3l6.6-6.6A5.5 5.5 0 0 1 15.8 4.8z" />
        }
      }
    </svg>
  `,
})
export class Icono {
  readonly nombre = input.required<NombreIcono>();
  readonly tamano = input(20);
}
