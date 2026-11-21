import { ModuloAplicacion } from '../../nucleo/modulo';

export const moduloAjustes: ModuloAplicacion = {
  nombre: 'ajustes',
  ruta: 'ajustes',
  menu: { etiqueta: 'Ajustes', icono: 'ajustes', ubicacion: 'inferior' },
  cargarPagina: () => import('./ui/ajustes').then((m) => m.Ajustes),
};
