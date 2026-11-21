import { ModuloAplicacion } from '../../nucleo/modulo';

export const moduloClientes: ModuloAplicacion = {
  nombre: 'clientes',
  ruta: 'clientes',
  menu: { etiqueta: 'Clientes', icono: 'clientes' },
  cargarPagina: () => import('./ui/clientes').then((m) => m.Clientes),
};
