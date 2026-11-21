import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NOMBRE_APLICACION, USUARIO_DE_MUESTRA } from '../../../config/general';
import { MODULOS_ACTIVOS } from '../../../config/modulos';
import { Icono } from '../../icono/icono';
import { ModuloAplicacion } from '../../modulo';
import { EstadoMenuLateral } from '../../servicios/estado-menu-lateral';
import { iniciales } from '../../utilidades/texto';

/*
 * Menú lateral en escritorio y barra inferior en celular.
 * Marca arriba; módulos (con submenú desplegable si lo tienen); Ajustes, Cerrar sesión y usuario al pie.
 */
@Component({
  selector: 'app-menu-lateral',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icono],
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.scss',
})
export class MenuLateral {
  private readonly router = inject(Router);
  protected readonly estado = inject(EstadoMenuLateral);

  protected readonly principales = MODULOS_ACTIVOS.filter((m) => m.menu.ubicacion !== 'inferior');
  protected readonly inferiores = MODULOS_ACTIVOS.filter((m) => m.menu.ubicacion === 'inferior');
  protected readonly nombreAplicacion = NOMBRE_APLICACION;
  protected readonly inicial = NOMBRE_APLICACION.charAt(0);
  protected readonly usuario = USUARIO_DE_MUESTRA;
  protected readonly inicialesUsuario = iniciales(USUARIO_DE_MUESTRA);

  // Submenús abiertos (por nombre de módulo); empiezan cerrados
  protected readonly abiertos = signal<ReadonlySet<string>>(new Set());

  // Ruta actual, para marcar como activo el desplegable de la sección donde estás
  private readonly rutaActual = signal(this.router.url);

  // Posición del indicador de hover, relativa a la lista
  protected readonly indicador = signal({ x: 0, y: 0, ancho: 0, alto: 0, visible: false });

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((evento) => {
      if (evento instanceof NavigationEnd) this.rutaActual.set(evento.urlAfterRedirects);
    });
  }

  protected estaAbierto(modulo: ModuloAplicacion): boolean {
    return this.abiertos().has(modulo.nombre);
  }

  protected estaEnModulo(modulo: ModuloAplicacion): boolean {
    const url = this.rutaActual().split(/[?#]/)[0];
    return url === `/${modulo.ruta}` || url.startsWith(`/${modulo.ruta}/`);
  }

  protected alternarSubmenu(modulo: ModuloAplicacion): void {
    const abiertos = new Set(this.abiertos());
    if (abiertos.has(modulo.nombre)) abiertos.delete(modulo.nombre);
    else abiertos.add(modulo.nombre);
    this.abiertos.set(abiertos);
  }

  protected rutaSubpagina(modulo: ModuloAplicacion, ruta: string): string {
    return ruta ? `/${modulo.ruta}/${ruta}` : `/${modulo.ruta}`;
  }

  protected moverIndicador(evento: PointerEvent, lista: HTMLElement): void {
    if (evento.pointerType === 'touch') return;
    const caja = (evento.currentTarget as HTMLElement).getBoundingClientRect();
    const base = lista.getBoundingClientRect();
    this.indicador.set({
      x: caja.left - base.left,
      y: caja.top - base.top,
      ancho: caja.width,
      alto: caja.height,
      visible: true,
    });
  }

  protected ocultarIndicador(): void {
    this.indicador.update((actual) => ({ ...actual, visible: false }));
  }

}
