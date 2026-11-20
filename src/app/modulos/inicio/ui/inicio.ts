import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Inicio</h1>
    <p class="texto-suave">Página en construcción.</p>
  `,
})
export class Inicio {}
