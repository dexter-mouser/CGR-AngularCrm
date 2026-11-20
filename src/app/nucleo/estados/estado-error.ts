import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Icono } from '../icono/icono';

// Error dentro de un bloque: mensaje corto y botón para volver a intentar, sin afectar al resto de la página
@Component({
  selector: 'app-estado-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono],
  template: `
    <div class="estado-error" role="alert">
      <app-icono nombre="alerta" />
      <p class="estado-error__mensaje">{{ mensaje() }}</p>
      <button class="boton-secundario" type="button" (click)="reintentar.emit()">Reintentar</button>
    </div>
  `,
  styles: `
    .estado-error {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--espacio-3);
      padding: var(--espacio-3) var(--espacio-4);
      color: var(--color-error);
      background-color: color-mix(in oklab, var(--color-error) 8%, var(--color-superficie));
      border-radius: var(--radio);
    }

    .estado-error__mensaje {
      flex: 1;
      min-inline-size: 12rem;
      color: var(--color-texto);
    }
  `,
})
export class EstadoError {
  readonly mensaje = input('No se pudo cargar esta información.');
  readonly reintentar = output();
}
