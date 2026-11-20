import { ModuloAplicacion } from '../../nucleo/modulo';

export const moduloInicio: ModuloAplicacion = {
  nombre: 'inicio',
  ruta: 'inicio',
  menu: { etiqueta: 'Inicio', icono: 'inicio' },
  cargarPagina: () => import('./ui/inicio').then((m) => m.Inicio),
};
