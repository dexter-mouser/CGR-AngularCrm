import { Injectable } from '@angular/core';

// Acceso seguro a localStorage: si el navegador lo bloquea, se usa el valor por defecto
@Injectable({ providedIn: 'root' })
export class Almacenamiento {
  leer(clave: string): string | null {
    try {
      return localStorage.getItem(clave);
    } catch (error) {
      console.error('No se pudo leer localStorage', error);
      return null;
    }
  }

  guardar(clave: string, valor: string): void {
    try {
      localStorage.setItem(clave, valor);
    } catch (error) {
      console.error('No se pudo guardar en localStorage', error);
    }
  }

  borrar(clave: string): void {
    try {
      localStorage.removeItem(clave);
    } catch (error) {
      console.error('No se pudo borrar de localStorage', error);
    }
  }
}
