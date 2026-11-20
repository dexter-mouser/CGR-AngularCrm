import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Carga } from '../../../nucleo/esqueleto/carga';
import { EsqueletoListado } from '../../../nucleo/esqueleto/esqueleto-listado';
import { EstadoError } from '../../../nucleo/estados/estado-error';
import { ListarVentas } from '../aplicacion/listar-ventas';
import type { Venta } from '../dominio/venta';

@Component({
  selector: 'app-ventas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EsqueletoListado, EstadoError],
  templateUrl: './ventas.html',
})
export class Ventas {
  private readonly listarVentas = inject(ListarVentas);

  protected readonly carga = new Carga<Venta[]>(() => this.listarVentas.ejecutar());

  constructor() {
    this.carga.cargar();
  }
}
