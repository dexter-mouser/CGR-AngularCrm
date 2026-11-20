import { InjectionToken } from '@angular/core';
import { Producto } from '../dominio/producto';

// Puerto: lo que el inventario necesita de cualquier fuente de datos
export interface ProductosRepositorio {
  listar(): Promise<Producto[]>;
}

// Token para enlazar el puerto con su adaptador (ver config/proveedores.ts)
export const PRODUCTOS_REPOSITORIO = new InjectionToken<ProductosRepositorio>(
  'ProductosRepositorio',
);
