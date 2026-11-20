// Constantes globales de la aplicación
export const NOMBRE_APLICACION = 'CGR CRM';
export const USUARIO_DE_MUESTRA = 'Usuario de muestra';

// Claves de localStorage
export const CLAVE_TEMA = 'cgr-tema';
export const CLAVE_MENU_RECOGIDO = 'cgr-menu-recogido';

// Demora de los adaptadores en memoria para ver el esqueleto de carga (quitar con el backend real)
export const DEMORA_SIMULADA_MS = 800;

// Tiempo que debe tardar un cambio de página antes de mostrar su esqueleto (evita parpadeos)
export const UMBRAL_ESQUELETO_PAGINA_MS = 100;

// Cuadrícula de la página de ubicación espacial
export const CUADRICULA_UBICACION = {
  columnas: 12,
  filas: 12,
} as const;
