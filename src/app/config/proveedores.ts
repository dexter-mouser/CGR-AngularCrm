import { Provider } from '@angular/core';
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
