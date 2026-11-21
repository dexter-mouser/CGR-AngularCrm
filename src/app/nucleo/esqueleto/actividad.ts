import { computed, signal } from '@angular/core';

// Cuántas cargas visibles hay en curso (bloques con esqueleto o cambio de página lento)
const cargasActivas = signal(0);

// La barra de carga de la cabecera se muestra mientras haya alguna
export const hayCargaActiva = computed(() => cargasActivas() > 0);

// Registra una carga y devuelve la función que la termina (llamarla más de una vez no tiene efecto)
export function iniciarActividad(): () => void {
  cargasActivas.update((total) => total + 1);
  let terminada = false;
  return () => {
    if (terminada) return;
    terminada = true;
    cargasActivas.update((total) => Math.max(0, total - 1));
  };
}
