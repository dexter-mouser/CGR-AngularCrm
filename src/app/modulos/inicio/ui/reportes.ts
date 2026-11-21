import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Proximamente } from '../../../nucleo/estados/proximamente';

// Reportes: en construcción
@Component({
  selector: 'app-reportes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Proximamente],
  template: `
    <h1>Reportes</h1>
    <app-proximamente />
  `,
})
export class Reportes {}
