import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Proximamente } from '../../../nucleo/estados/proximamente';

// Ventas: en construcción
@Component({
  selector: 'app-ventas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Proximamente],
  template: `
    <h1>Ventas</h1>
    <app-proximamente />
  `,
})
export class Ventas {}
