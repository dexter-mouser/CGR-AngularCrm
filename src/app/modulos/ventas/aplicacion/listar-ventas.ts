import type { Venta } from '../dominio/venta';
import type { VentasRepositorio } from '../puertos/ventas-repositorio';

// Caso de uso: listar las ventas
export class ListarVentas {
  constructor(private readonly repositorio: VentasRepositorio) {}

  ejecutar(): Promise<Venta[]> {
    return this.repositorio.listar();
  }
}
