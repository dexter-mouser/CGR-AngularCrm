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
  | 'grafica'
  | 'arrastrar'
  | 'copiar'
  | 'check'
  | 'documento'
  | 'usuario-mas'
  | 'caja'
  | 'compra'
  | 'abono';

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
      stroke-width="2"
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
        @case ('grafica') {
          <path d="M3 3v18h18" />
          <path d="M8 17v-5M13 17V8M18 17v-8" />
        }
        @case ('arrastrar') {
          <circle cx="9" cy="6" r="1" />
          <circle cx="15" cy="6" r="1" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="9" cy="18" r="1" />
          <circle cx="15" cy="18" r="1" />
        }
        @case ('copiar') {
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
        }
        @case ('check') {
          <path d="M5 12.5 10 17.5 19 7" />
        }
        @case ('documento') {
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h4" />
        }
        @case ('usuario-mas') {
          <circle cx="10" cy="8" r="4" />
          <path d="M3 21a7 7 0 0 1 12.5-4.3" />
          <path d="M19 15v6M16 18h6" />
        }
        @case ('caja') {
          <rect x="3" y="10" width="18" height="11" rx="2" />
          <path d="M7 10V5h10v5" />
          <path d="M10 3h4" />
          <path d="M7 15h2M11 15h2M15 15h2" />
        }
        @case ('compra') {
          <path d="M5 8h14l-1.5 12h-11z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        }
        @case ('abono') {
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9h-4a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H9" />
          <path d="M12 7.5V9M12 15v1.5" />
        }
      }
    </svg>
  `,
})
export class Icono {
  readonly nombre = input.required<NombreIcono>();
  readonly tamano = input(20);
}
