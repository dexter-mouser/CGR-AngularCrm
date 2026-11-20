import { DEMORA_SIMULADA_MS } from '../../../config/general';
import { esperar } from '../../../nucleo/utilidades/esperar';
import type { Producto } from '../dominio/producto';
import type { ProductosRepositorio } from '../puertos/productos-repositorio';

// Adaptador provisional sin backend: devuelve una lista vacía tras una demora simulada
export class ProductosEnMemoria implements ProductosRepositorio {
  private readonly productos: Producto[] = [];

  async listar(): Promise<Producto[]> {
    await esperar(DEMORA_SIMULADA_MS);
    return [...this.productos];
  }
}
