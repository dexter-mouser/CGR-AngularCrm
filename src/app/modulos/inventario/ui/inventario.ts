import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EsqueletoListado } from '../../../nucleo/esqueleto/esqueleto-listado';
import { ListarProductos } from '../aplicacion/listar-productos';
import type { Producto } from '../dominio/producto';

type EstadoCarga = 'cargando' | 'listo' | 'error';

@Component({
  selector: 'app-inventario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EsqueletoListado],
  templateUrl: './inventario.html',
})
export class Inventario {
  private readonly listarProductos = inject(ListarProductos);

  protected readonly estado = signal<EstadoCarga>('cargando');
  protected readonly productos = signal<Producto[]>([]);

  constructor() {
    this.cargar();
  }

  private async cargar(): Promise<void> {
    try {
      this.productos.set(await this.listarProductos.ejecutar());
      this.estado.set('listo');
    } catch (error) {
      console.error('No se pudo cargar el inventario', error);
      this.estado.set('error');
    }
  }
}
