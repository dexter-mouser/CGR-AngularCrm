import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Proximamente } from '../../../nucleo/estados/proximamente';

// Inventario: en construcción
@Component({
  selector: 'app-inventario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Proximamente],
  template: `
    <h1>Inventario</h1>
    <app-proximamente />
  `,
})
export class Inventario {}
