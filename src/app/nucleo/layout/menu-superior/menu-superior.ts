import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NOMBRE_APLICACION, USUARIO_DE_MUESTRA } from '../../../config/general';
import { Icono } from '../../icono/icono';
import { EstadoMenuLateral } from '../../servicios/estado-menu-lateral';
import { BotonTema } from '../../tema/boton-tema';

@Component({
  selector: 'app-menu-superior',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icono, BotonTema],
  templateUrl: './menu-superior.html',
  styleUrl: './menu-superior.scss',
})
export class MenuSuperior {
  protected readonly menuLateral = inject(EstadoMenuLateral);
  protected readonly nombreAplicacion = NOMBRE_APLICACION;
  protected readonly usuario = USUARIO_DE_MUESTRA;
}
