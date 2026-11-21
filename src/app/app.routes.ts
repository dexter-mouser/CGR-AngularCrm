import { Routes } from '@angular/router';
import { NOMBRE_APLICACION } from './config/general';
import { MODULOS_ACTIVOS } from './config/modulos';
import { PROVEEDORES_POR_MODULO } from './config/proveedores';

// Rutas de los módulos activos y de sus subpáginas, dentro del layout
const rutasDeModulos: Routes = MODULOS_ACTIVOS.flatMap((modulo) => {
  const providers = PROVEEDORES_POR_MODULO[modulo.nombre] ?? [];
  const principal = {
    path: modulo.ruta,
    title: `${modulo.menu.etiqueta} | ${NOMBRE_APLICACION}`,
    loadComponent: modulo.cargarPagina,
    providers,
    data: { miga: modulo.menu.etiqueta },
  };
  const subpaginas = (modulo.submenu ?? [])
    .filter((subpagina) => subpagina.ruta !== '')
    .map((subpagina) => ({
      path: `${modulo.ruta}/${subpagina.ruta}`,
      title: `${subpagina.etiqueta} | ${NOMBRE_APLICACION}`,
      loadComponent: subpagina.cargarPagina ?? modulo.cargarPagina,
      providers,
      data: { miga: subpagina.etiqueta },
    }));
  return [principal, ...subpaginas];
});

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: `Ingresar | ${NOMBRE_APLICACION}`,
    loadComponent: () => import('./modulos/acceso/ui/login').then((m) => m.Login),
    providers: PROVEEDORES_POR_MODULO['acceso'] ?? [],
  },
  {
    path: '',
    loadComponent: () => import('./nucleo/layout/layout').then((m) => m.Layout),
    children: [
      ...rutasDeModulos,
      {
        path: 'ubicacion',
        title: `Ubicación espacial | ${NOMBRE_APLICACION}`,
        data: { miga: 'Ubicación espacial' },
        loadComponent: () => import('./modulos/ubicacion/ui/ubicacion').then((m) => m.Ubicacion),
      },
    ],
  },
  {
    path: '**',
    title: `Página no encontrada | ${NOMBRE_APLICACION}`,
    loadComponent: () => import('./nucleo/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
  },
];
