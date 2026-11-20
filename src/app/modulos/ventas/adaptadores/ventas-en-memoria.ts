import { DEMORA_SIMULADA_MS } from '../../../config/general';
import { esperar } from '../../../nucleo/utilidades/esperar';
import type { Venta } from '../dominio/venta';
import type { VentasRepositorio } from '../puertos/ventas-repositorio';

// Adaptador provisional sin backend: devuelve una lista vacía tras una demora simulada
export class VentasEnMemoria implements VentasRepositorio {
  private readonly ventas: Venta[] = [];

  async listar(): Promise<Venta[]> {
    await esperar(DEMORA_SIMULADA_MS);
    return [...this.ventas];
  }
}
