import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Proximamente } from '../../../nucleo/estados/proximamente';

// Panel de Inicio: en construcción
@Component({
  selector: 'app-inicio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Proximamente],
  template: `
    <h1>Inicio</h1>
    <app-proximamente />
  `,
})
export class Inicio {}
