import { DEMORA_SIMULADA_MS, NOMBRE_APLICACION } from '../../../config/general';
import { esperar } from '../../../nucleo/utilidades/esperar';
import type { ConfiguracionAcceso } from '../dominio/configuracion-acceso';
import type { AccesoRepositorio } from '../puertos/acceso-repositorio';

// Adaptador provisional sin backend: configuración fija e ingreso sin validar, con demora simulada
export class AccesoEnMemoria implements AccesoRepositorio {
  async obtenerConfiguracion(): Promise<ConfiguracionAcceso> {
    await esperar(DEMORA_SIMULADA_MS);
    return {
      nombreTienda: NOMBRE_APLICACION,
      accesoPrueba: { usuario: 'propietario.demo', rol: 'Propietario' },
    };
  }

  async ingresar(): Promise<void> {
    await esperar(DEMORA_SIMULADA_MS);
  }
}
