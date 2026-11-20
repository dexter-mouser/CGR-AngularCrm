import { Routes } from '@angular/router';
import { NOMBRE_APLICACION } from './config/general';
import { MODULOS_ACTIVOS } from './config/modulos';
import { PROVEEDORES_POR_MODULO } from './config/proveedores';

// Rutas de los módulos activos, dentro del layout
const rutasDeModulos: Routes = MODULOS_ACTIVOS.map((modulo) => ({
  path: modulo.ruta,
  title: `${modulo.menu.etiqueta} | ${NOMBRE_APLICACION}`,
  loadComponent: modulo.cargarPagina,
  providers: PROVEEDORES_POR_MODULO[modulo.nombre] ?? [],
}));

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: `Ingresar | ${NOMBRE_APLICACION}`,
    loadComponent: () => import('./modulos/acceso/ui/login').then((m) => m.Login),
  },
  {
    path: '',
    loadComponent: () => import('./nucleo/layout/layout').then((m) => m.Layout),
    children: [
      ...rutasDeModulos,
      {
        path: 'ubicacion',
        title: `Ubicación espacial | ${NOMBRE_APLICACION}`,
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
