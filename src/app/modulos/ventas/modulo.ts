import { ModuloAplicacion } from '../../nucleo/modulo';

export const moduloVentas: ModuloAplicacion = {
  nombre: 'ventas',
  ruta: 'ventas',
  menu: { etiqueta: 'Ventas', icono: 'ventas' },
  cargarPagina: () => import('./ui/ventas').then((m) => m.Ventas),
};
