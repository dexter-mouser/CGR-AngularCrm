import { DOCUMENT, Injectable, inject } from '@angular/core';
import { CLAVE_TEMA } from '../../config/general';
import { Almacenamiento } from './almacenamiento';

type Esquema = 'light' | 'dark';

const ESQUEMA_DEL_SISTEMA = 'light dark';
const ESQUEMAS_VALIDOS: readonly string[] = ['light', 'dark'];

/*
 * Tema claro/oscuro.
 * Sin valor guardado se sigue el tema del sistema. Al alternar se guarda el tema
 * solo si es distinto al del sistema; si coincide, se borra y se vuelve a seguir al sistema.
 */
@Injectable({ providedIn: 'root' })
export class Tema {
  private readonly documento = inject(DOCUMENT);
  private readonly almacenamiento = inject(Almacenamiento);

  constructor() {
    // Mantiene el tema igual entre pestañas abiertas
    this.documento.defaultView?.addEventListener('storage', (evento) => {
      if (evento.key === CLAVE_TEMA) this.aplicar(this.leerGuardado());
    });
  }

  alternar(): void {
    const objetivo: Esquema = this.esquemaVisible() === 'dark' ? 'light' : 'dark';

    if (objetivo === this.esquemaDelSistema()) {
      this.almacenamiento.borrar(CLAVE_TEMA);
      this.aplicar(null);
    } else {
      this.almacenamiento.guardar(CLAVE_TEMA, objetivo);
      this.aplicar(objetivo);
    }
  }

  private esquemaVisible(): Esquema {
    return this.leerGuardado() ?? this.esquemaDelSistema();
  }

  private esquemaDelSistema(): Esquema {
    const esOscuro = this.documento.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches;
    return esOscuro ? 'dark' : 'light';
  }

  private leerGuardado(): Esquema | null {
    const valor = this.almacenamiento.leer(CLAVE_TEMA);
    return valor !== null && ESQUEMAS_VALIDOS.includes(valor) ? (valor as Esquema) : null;
  }

  private aplicar(esquema: Esquema | null): void {
    const meta = this.documento.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (meta) meta.content = esquema ?? ESQUEMA_DEL_SISTEMA;
  }
}
