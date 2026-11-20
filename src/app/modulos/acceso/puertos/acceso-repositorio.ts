import { InjectionToken } from '@angular/core';
import type { ConfiguracionAcceso } from '../dominio/configuracion-acceso';

// Puerto: lo que el acceso necesita de cualquier fuente de datos
export interface AccesoRepositorio {
  obtenerConfiguracion(): Promise<ConfiguracionAcceso>;
  ingresar(usuario: string, clave: string): Promise<void>;
}

// Token para enlazar el puerto con su adaptador (ver config/proveedores.ts)
export const ACCESO_REPOSITORIO = new InjectionToken<AccesoRepositorio>('AccesoRepositorio');
