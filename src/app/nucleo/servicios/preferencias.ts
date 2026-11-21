import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { CLAVE_DENSIDAD, CLAVE_MARCA, MARCA_POR_DEFECTO } from '../../config/general';
import { Almacenamiento } from './almacenamiento';

export const DENSIDADES = ['comoda', 'compacta'] as const;
export type Densidad = (typeof DENSIDADES)[number];

export const MARCAS = ['naranja', 'azul', 'verde', 'violeta'] as const;
export type Marca = (typeof MARCAS)[number];

/*
 * Densidad y color de marca. Se guardan en localStorage y se aplican como atributos de <html>
 * (data-densidad y data-marca), que cambian solo las variables CSS.
 * index.html los aplica antes de pintar para evitar un destello.
 */
@Injectable({ providedIn: 'root' })
export class Preferencias {
  private readonly documento = inject(DOCUMENT);
  private readonly almacenamiento = inject(Almacenamiento);

  readonly densidad = signal<Densidad>(this.leer(CLAVE_DENSIDAD, DENSIDADES, 'comoda'));
  readonly marca = signal<Marca>(this.leer(CLAVE_MARCA, MARCAS, MARCA_POR_DEFECTO));

  constructor() {
    this.aplicar('densidad', this.densidad(), 'comoda');
    this.aplicar('marca', this.marca(), MARCA_POR_DEFECTO);
  }

  elegirDensidad(densidad: Densidad): void {
    this.densidad.set(densidad);
    this.almacenamiento.guardar(CLAVE_DENSIDAD, densidad);
    this.aplicar('densidad', densidad, 'comoda');
  }

  elegirMarca(marca: Marca): void {
    this.marca.set(marca);
    this.almacenamiento.guardar(CLAVE_MARCA, marca);
    this.aplicar('marca', marca, MARCA_POR_DEFECTO);
  }

  // El valor por defecto no lleva atributo: lo resuelven las variables base
  private aplicar(nombre: 'densidad' | 'marca', valor: string, porDefecto: string): void {
    const raiz = this.documento.documentElement;
    if (valor === porDefecto) raiz.removeAttribute(`data-${nombre}`);
    else raiz.setAttribute(`data-${nombre}`, valor);
  }

  private leer<T extends string>(clave: string, validos: readonly T[], porDefecto: T): T {
    const valor = this.almacenamiento.leer(clave);
    return valor !== null && (validos as readonly string[]).includes(valor) ? (valor as T) : porDefecto;
  }
}
