import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icono, NombreIcono } from '../icono/icono';

// Bloque sin datos: icono suave, una frase y, si hay ruta, un botón para empezar
@Component({
  selector: 'app-estado-vacio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono, RouterLink],
  template: `
    <div class="estado-vacio">
      <span class="estado-vacio__icono">
        <app-icono [nombre]="icono()" [tamano]="28" />
      </span>
      <p class="estado-vacio__mensaje">{{ mensaje() }}</p>
      @if (accion(); as accion) {
        <a class="boton-secundario" [routerLink]="accion.ruta">{{ accion.texto }}</a>
      }
    </div>
  `,
  styles: `
    .estado-vacio {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--espacio-3);
      block-size: 100%;
      padding: var(--espacio-6) var(--espacio-4);
      text-align: center;
    }

    .estado-vacio__icono {
      display: grid;
      place-items: center;
      inline-size: 56px;
      block-size: 56px;
      color: var(--color-acento);
      background-color: var(--color-acento-suave);
      border-radius: 50%;
    }

    .estado-vacio__mensaje {
      color: var(--color-texto-secundario);
    }
  `,
})
export class EstadoVacio {
  readonly mensaje = input.required<string>();
  readonly icono = input<NombreIcono>('grafica');
  readonly accion = input<{ texto: string; ruta: string } | null>(null);
}
