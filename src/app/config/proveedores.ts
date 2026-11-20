import { Provider } from '@angular/core';
import { AccesoEnMemoria } from '../modulos/acceso/adaptadores/acceso-en-memoria';
import { Ingresar, ObtenerConfiguracionAcceso } from '../modulos/acceso/aplicacion/acceso';
import { ACCESO_REPOSITORIO, AccesoRepositorio } from '../modulos/acceso/puertos/acceso-repositorio';
import { PanelEnMemoria } from '../modulos/inicio/adaptadores/panel-en-memoria';
import { ConsultarPanel } from '../modulos/inicio/aplicacion/consultar-panel';
import { PANEL_REPOSITORIO, PanelRepositorio } from '../modulos/inicio/puertos/panel-repositorio';
import { ProductosEnMemoria } from '../modulos/inventario/adaptadores/productos-en-memoria';
import { ListarProductos } from '../modulos/inventario/aplicacion/listar-productos';
import {
  PRODUCTOS_REPOSITORIO,
  ProductosRepositorio,
} from '../modulos/inventario/puertos/productos-repositorio';
import { VentasEnMemoria } from '../modulos/ventas/adaptadores/ventas-en-memoria';
import { ListarVentas } from '../modulos/ventas/aplicacion/listar-ventas';
import { VENTAS_REPOSITORIO, VentasRepositorio } from '../modulos/ventas/puertos/ventas-repositorio';

/*
 * Enlace de cada puerto con su adaptador.
 * Para cambiar de fuente de datos (Supabase, API propia…) solo se cambia el `useClass`.
 */
export const PROVEEDORES_POR_MODULO: Record<string, Provider[]> = {
  acceso: [
    { provide: ACCESO_REPOSITORIO, useClass: AccesoEnMemoria },
    {
      provide: ObtenerConfiguracionAcceso,
      useFactory: (repositorio: AccesoRepositorio) => new ObtenerConfiguracionAcceso(repositorio),
      deps: [ACCESO_REPOSITORIO],
    },
    {
      provide: Ingresar,
      useFactory: (repositorio: AccesoRepositorio) => new Ingresar(repositorio),
      deps: [ACCESO_REPOSITORIO],
    },
  ],
  inicio: [
    { provide: PANEL_REPOSITORIO, useClass: PanelEnMemoria },
    {
      provide: ConsultarPanel,
      useFactory: (repositorio: PanelRepositorio) => new ConsultarPanel(repositorio),
      deps: [PANEL_REPOSITORIO],
    },
  ],
  inventario: [
    { provide: PRODUCTOS_REPOSITORIO, useClass: ProductosEnMemoria },
    {
      provide: ListarProductos,
      useFactory: (repositorio: ProductosRepositorio) => new ListarProductos(repositorio),
      deps: [PRODUCTOS_REPOSITORIO],
    },
  ],
  ventas: [
    { provide: VENTAS_REPOSITORIO, useClass: VentasEnMemoria },
    {
      provide: ListarVentas,
      useFactory: (repositorio: VentasRepositorio) => new ListarVentas(repositorio),
      deps: [VENTAS_REPOSITORIO],
    },
  ],
};
