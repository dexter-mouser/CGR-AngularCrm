import { Type } from '@angular/core';
import { NombreIcono } from './icono/icono';

// Página extra de un módulo, que aparece como submenú bajo su opción
export interface SubpaginaModulo {
  etiqueta: string;
  /** Ruta relativa a la del módulo ('' es la página principal del módulo) */
  ruta: string;
  /** Sin ella se usa la página principal del módulo */
  cargarPagina?: () => Promise<Type<unknown>>;
}

// Contrato de un módulo: lo que el núcleo necesita para crear sus rutas y su opción de menú
export interface ModuloAplicacion {
  /** Identificador único; también es la clave de sus proveedores en config/proveedores.ts */
  nombre: string;
  ruta: string;
  menu: {
    etiqueta: string;
    icono: NombreIcono;
    /** 'inferior' la pone al pie del menú, junto a Cerrar sesión */
    ubicacion?: 'principal' | 'inferior';
  };
  cargarPagina: () => Promise<Type<unknown>>;
  submenu?: readonly SubpaginaModulo[];
}
