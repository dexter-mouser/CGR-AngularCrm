import { Injectable, inject, signal } from '@angular/core';
import { CLAVE_MENU_RECOGIDO } from '../../config/general';
import { Almacenamiento } from './almacenamiento';

// Estado del menú lateral (abierto o recogido a solo iconos), guardado entre recargas
@Injectable({ providedIn: 'root' })
export class EstadoMenuLateral {
  private readonly almacenamiento = inject(Almacenamiento);

  readonly estaRecogido = signal(this.almacenamiento.leer(CLAVE_MENU_RECOGIDO) === 'si');

  alternar(): void {
    const recogido = !this.estaRecogido();
    this.estaRecogido.set(recogido);
    this.almacenamiento.guardar(CLAVE_MENU_RECOGIDO, recogido ? 'si' : 'no');
  }
}
