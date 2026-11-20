import type { ConfiguracionAcceso } from '../dominio/configuracion-acceso';
import type { AccesoRepositorio } from '../puertos/acceso-repositorio';

// Caso de uso: obtener la marca y el acceso de prueba de la tienda
export class ObtenerConfiguracionAcceso {
  constructor(private readonly repositorio: AccesoRepositorio) {}

  ejecutar(): Promise<ConfiguracionAcceso> {
    return this.repositorio.obtenerConfiguracion();
  }
}

// Caso de uso: ingresar al sistema
export class Ingresar {
  constructor(private readonly repositorio: AccesoRepositorio) {}

  ejecutar(usuario: string, clave: string): Promise<void> {
    return this.repositorio.ingresar(usuario.trim(), clave);
  }
}
