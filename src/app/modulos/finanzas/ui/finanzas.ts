import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Proximamente } from '../../../nucleo/estados/proximamente';

// Finanzas: en construcción
@Component({
  selector: 'app-finanzas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Proximamente],
  template: `
    <h1>Finanzas</h1>
    <app-proximamente />
  `,
})
export class Finanzas {}
