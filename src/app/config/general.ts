// Constantes globales de la aplicación
export const NOMBRE_APLICACION = 'CGR CRM';
export const USUARIO_DE_MUESTRA = 'Usuario de muestra';

// Claves de localStorage
export const CLAVE_TEMA = 'cgr-tema';
export const CLAVE_MENU_RECOGIDO = 'cgr-menu-recogido';
export const CLAVE_DENSIDAD = 'cgr-densidad';
export const CLAVE_MARCA = 'cgr-marca';

// Color de marca del cliente (naranja/ámbar, azul, verde o violeta); se puede cambiar en Ajustes
export const MARCA_POR_DEFECTO = 'naranja';

// Demora de los adaptadores en memoria para ver el esqueleto de carga (quitar con el backend real)
export const DEMORA_SIMULADA_MS = 1500;

// El esqueleto aparece solo si la carga tarda más que el umbral y, una vez visible, dura al menos el mínimo
export const UMBRAL_ESQUELETO_MS = 200;
export const MINIMO_ESQUELETO_MS = 300;

// Tiempo que se muestra «Copiado ✓» en el login
export const DURACION_COPIADO_MS = 2000;

// Cuadrícula de la página de ubicación espacial
export const CUADRICULA_UBICACION = {
  columnas: 12,
  filas: 12,
} as const;
