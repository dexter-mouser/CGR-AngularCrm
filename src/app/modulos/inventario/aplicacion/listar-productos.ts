import type { Producto } from '../dominio/producto';
import type { ProductosRepositorio } from '../puertos/productos-repositorio';

// Caso de uso: listar los productos del inventario
export class ListarProductos {
  constructor(private readonly repositorio: ProductosRepositorio) {}

  ejecutar(): Promise<Producto[]> {
    return this.repositorio.listar();
  }
}
