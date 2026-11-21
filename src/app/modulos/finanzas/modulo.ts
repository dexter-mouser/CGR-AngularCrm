import { ModuloAplicacion } from '../../nucleo/modulo';

export const moduloFinanzas: ModuloAplicacion = {
  nombre: 'finanzas',
  ruta: 'finanzas',
  menu: { etiqueta: 'Finanzas', icono: 'finanzas' },
  cargarPagina: () => import('./ui/finanzas').then((m) => m.Finanzas),
};
