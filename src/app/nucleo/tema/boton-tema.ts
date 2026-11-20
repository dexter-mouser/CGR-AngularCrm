import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icono } from '../icono/icono';
import { Tema } from '../servicios/tema';

// Botón de tema: luna en claro (pasa a oscuro), sol en oscuro (pasa a claro)
@Component({
  selector: 'app-boton-tema',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono],
  template: `
    <button class="boton-icono" type="button" (click)="tema.alternar()">
      <span data-tema="claro">
        <app-icono nombre="luna" />
        <span class="solo-lector">Cambiar a tema oscuro</span>
      </span>
      <span data-tema="oscuro">
        <app-icono nombre="sol" />
        <span class="solo-lector">Cambiar a tema claro</span>
      </span>
    </button>
  `,
})
export class BotonTema {
  protected readonly tema = inject(Tema);
}
