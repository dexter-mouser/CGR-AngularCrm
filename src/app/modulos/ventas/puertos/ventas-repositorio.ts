import { InjectionToken } from '@angular/core';
import type { Venta } from '../dominio/venta';

// Puerto: lo que ventas necesita de cualquier fuente de datos
export interface VentasRepositorio {
  listar(): Promise<Venta[]>;
}

// Token para enlazar el puerto con su adaptador (ver config/proveedores.ts)
export const VENTAS_REPOSITORIO = new InjectionToken<VentasRepositorio>('VentasRepositorio');
