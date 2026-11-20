import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icono, NombreIcono } from '../../../nucleo/icono/icono';

interface AccesoRapido {
  titulo: string;
  descripcion: string;
  icono: NombreIcono;
  /** Sin ruta: la pantalla aún no existe y el acceso se muestra inactivo */
  ruta: string | null;
}

const ACCESOS: readonly AccesoRapido[] = [
  { titulo: 'Registrar venta', descripcion: 'Cobra una venta nueva', icono: 'ventas', ruta: '/ventas' },
  { titulo: 'Nueva cotización', descripcion: 'Prepara un precio para un cliente', icono: 'documento', ruta: null },
  { titulo: 'Nuevo cliente', descripcion: 'Guarda sus datos de contacto', icono: 'usuario-mas', ruta: null },
  { titulo: 'Caja', descripcion: 'Abre o cierra la caja del día', icono: 'caja', ruta: null },
  { titulo: 'Ingresar compra', descripcion: 'Suma mercancía al inventario', icono: 'compra', ruta: '/inventario' },
  { titulo: 'Registrar abono', descripcion: 'Anota un pago a un crédito', icono: 'abono', ruta: null },
];

// Accesos rápidos: son fijos, por eso no tienen esqueleto
@Component({
  selector: 'app-accesos-rapidos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet, Icono],
  template: `
    <section aria-labelledby="titulo-accesos">
      <h2 class="solo-lector" id="titulo-accesos">Accesos rápidos</h2>
      <ul class="accesos">
        @for (acceso of accesos; track acceso.titulo) {
          <li>
            @if (acceso.ruta) {
              <a class="acceso" [routerLink]="acceso.ruta">
                <ng-container *ngTemplateOutlet="contenido; context: { $implicit: acceso }" />
              </a>
            } @else {
              <div class="acceso acceso--inactivo">
                <ng-container *ngTemplateOutlet="contenido; context: { $implicit: acceso }" />
                <span class="solo-lector">(próximamente)</span>
              </div>
            }
          </li>
        }
      </ul>
    </section>

    <ng-template #contenido let-acceso>
      <span class="acceso__icono"><app-icono [nombre]="acceso.icono" /></span>
      <span class="acceso__titulo">{{ acceso.titulo }}</span>
      <span class="acceso__descripcion">{{ acceso.descripcion }}</span>
    </ng-template>
  `,
  styles: `
    .accesos {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--espacio-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    @media (width >= 768px) {
      .accesos {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (width >= 1200px) {
      .accesos {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }
    }

    li {
      display: flex;
    }

    .acceso {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: var(--espacio-1);
      padding: var(--espacio-3);
      text-decoration: none;
      background-color: var(--color-superficie);
      border: var(--borde);
      border-radius: var(--radio-tarjeta);
      box-shadow: var(--sombra-tarjeta);
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }

    a.acceso:hover {
      background-color: var(--color-superficie-hover);
      border-color: var(--color-acento);
    }

    a.acceso:active {
      background-color: var(--color-acento-suave);
    }

    .acceso--inactivo {
      opacity: 0.6;
    }

    .acceso__icono {
      display: grid;
      place-items: center;
      inline-size: 40px;
      block-size: 40px;
      margin-block-end: var(--espacio-1);
      color: var(--color-acento);
      background-color: var(--color-acento-suave);
      border-radius: var(--radio);
    }

    .acceso__titulo {
      font-weight: 600;
      line-height: 1.3;
    }

    .acceso__descripcion {
      font-size: var(--texto-sm);
      line-height: 1.4;
      color: var(--color-texto-secundario);
    }
  `,
})
export class AccesosRapidos {
  protected readonly accesos = ACCESOS;
}
