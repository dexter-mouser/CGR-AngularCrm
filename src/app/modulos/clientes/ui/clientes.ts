import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Proximamente } from '../../../nucleo/estados/proximamente';

// Clientes: en construcción
@Component({
  selector: 'app-clientes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Proximamente],
  template: `
    <h1>Clientes</h1>
    <app-proximamente />
  `,
})
export class Clientes {}
