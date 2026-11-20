import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/*
 * Envuelve las piezas de esqueleto de un bloque y anuncia «Cargando…» a los lectores de pantalla.
 * No crea caja propia: las piezas usan la distribución del contenedor, igual que el contenido real.
 * Mientras no es visible (umbral de espera) reserva el espacio sin pintarse.
 */
@Component({
  selector: 'app-zona-carga',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.zona-carga--oculta]': '!visible()' },
  styles: `
    :host {
      display: contents;
    }
  `,
  template: `
    <span class="solo-lector" role="status">{{ texto() }}</span>
    <ng-content />
  `,
})
export class ZonaCarga {
  readonly visible = input(true);
  readonly texto = input('Cargando…');
}
