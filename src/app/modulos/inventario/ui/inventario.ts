import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Carga } from '../../../nucleo/esqueleto/carga';
import { EsqueletoListado } from '../../../nucleo/esqueleto/esqueleto-listado';
import { EstadoError } from '../../../nucleo/estados/estado-error';
import { ListarProductos } from '../aplicacion/listar-productos';
import type { Producto } from '../dominio/producto';

@Component({
  selector: 'app-inventario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EsqueletoListado, EstadoError],
  templateUrl: './inventario.html',
})
export class Inventario {
  private readonly listarProductos = inject(ListarProductos);

  protected readonly carga = new Carga<Producto[]>(() => this.listarProductos.ejecutar());

  constructor() {
    this.carga.cargar();
  }
}
