import { ModuloAplicacion } from '../../nucleo/modulo';

export const moduloInicio: ModuloAplicacion = {
  nombre: 'inicio',
  ruta: 'inicio',
  menu: { etiqueta: 'Inicio', icono: 'inicio' },
  cargarPagina: () => import('./ui/inicio').then((m) => m.Inicio),
  submenu: [
    { etiqueta: 'Panel', ruta: '' },
    {
      etiqueta: 'Reportes',
      ruta: 'reportes',
      cargarPagina: () => import('./ui/reportes').then((m) => m.Reportes),
    },
  ],
};
