import { ModuloAplicacion } from '../../nucleo/modulo';

export const moduloInventario: ModuloAplicacion = {
  nombre: 'inventario',
  ruta: 'inventario',
  menu: { etiqueta: 'Inventario', icono: 'inventario' },
  cargarPagina: () => import('./ui/inventario').then((m) => m.Inventario),
};
