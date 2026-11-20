// Constantes globales de la aplicación
export const NOMBRE_APLICACION = 'CGR CRM';
export const USUARIO_DE_MUESTRA = 'Usuario de muestra';

// Formato de moneda
export const IDIOMA = 'es-CO';
export const MONEDA = 'COP';

// Claves de localStorage
export const CLAVE_TEMA = 'cgr-tema';
export const CLAVE_MENU_RECOGIDO = 'cgr-menu-recogido';
export const CLAVE_ORDEN_INDICADORES = 'cgr-orden-indicadores';

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
