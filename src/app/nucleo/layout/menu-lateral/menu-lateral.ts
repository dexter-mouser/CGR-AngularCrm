import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MODULOS_ACTIVOS } from '../../../config/modulos';
import { Icono } from '../../icono/icono';
import { EstadoMenuLateral } from '../../servicios/estado-menu-lateral';

// Menú lateral en escritorio y barra inferior en celular, generado desde los módulos activos
@Component({
  selector: 'app-menu-lateral',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icono],
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.scss',
})
export class MenuLateral {
  protected readonly estado = inject(EstadoMenuLateral);
  protected readonly modulos = MODULOS_ACTIVOS;
}
