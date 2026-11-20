import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CUADRICULA_UBICACION } from '../../../config/general';

// Cuadrícula numerada para indicar dónde va cada elemento de una vista
@Component({
  selector: 'app-ubicacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ubicacion.html',
  styleUrl: './ubicacion.scss',
})
export class Ubicacion {
  protected readonly columnas = CUADRICULA_UBICACION.columnas;
  protected readonly filas = CUADRICULA_UBICACION.filas;
  protected readonly celdas = Array.from({ length: this.columnas * this.filas }, (_, i) => i + 1);
}
