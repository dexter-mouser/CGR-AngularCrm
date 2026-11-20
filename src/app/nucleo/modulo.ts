import { Type } from '@angular/core';
import { NombreIcono } from './icono/icono';

// Contrato de un módulo: lo que el núcleo necesita para crear su ruta y su opción de menú
export interface ModuloAplicacion {
  /** Identificador único; también es la clave de sus proveedores en config/proveedores.ts */
  nombre: string;
  ruta: string;
  menu: {
    etiqueta: string;
    icono: NombreIcono;
  };
  cargarPagina: () => Promise<Type<unknown>>;
}
