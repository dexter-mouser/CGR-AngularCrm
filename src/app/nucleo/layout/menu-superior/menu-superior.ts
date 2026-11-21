import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icono } from '../../icono/icono';
import { EstadoMenuLateral } from '../../servicios/estado-menu-lateral';
import { BotonTema } from '../../tema/boton-tema';
import { BarraCarga } from '../barra-carga/barra-carga';
import { Migas } from '../migas/migas';

// Cabecera del contenido: migas a la izquierda; tema a la derecha
@Component({
  selector: 'app-menu-superior',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono, BotonTema, Migas, BarraCarga],
  templateUrl: './menu-superior.html',
  styleUrl: './menu-superior.scss',
})
export class MenuSuperior {
  protected readonly menuLateral = inject(EstadoMenuLateral);
}
