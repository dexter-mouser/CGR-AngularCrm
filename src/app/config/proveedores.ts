import { Provider } from '@angular/core';
import { AccesoEnMemoria } from '../modulos/acceso/adaptadores/acceso-en-memoria';
import { Ingresar, ObtenerConfiguracionAcceso } from '../modulos/acceso/aplicacion/acceso';
import { ACCESO_REPOSITORIO, AccesoRepositorio } from '../modulos/acceso/puertos/acceso-repositorio';

/*
 * Enlace de cada puerto con su adaptador.
 * Para cambiar de fuente de datos (Supabase, API propia…) solo se cambia el `useClass`.
 */
export const PROVEEDORES_POR_MODULO: Record<string, Provider[]> = {
  acceso: [
    { provide: ACCESO_REPOSITORIO, useClass: AccesoEnMemoria },
    {
      provide: ObtenerConfiguracionAcceso,
      useFactory: (repositorio: AccesoRepositorio) => new ObtenerConfiguracionAcceso(repositorio),
      deps: [ACCESO_REPOSITORIO],
    },
    {
      provide: Ingresar,
      useFactory: (repositorio: AccesoRepositorio) => new Ingresar(repositorio),
      deps: [ACCESO_REPOSITORIO],
    },
  ],
};
