import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EsqueletoListado } from '../../../nucleo/esqueleto/esqueleto-listado';
import { ListarVentas } from '../aplicacion/listar-ventas';
import type { Venta } from '../dominio/venta';

type EstadoCarga = 'cargando' | 'listo' | 'error';

@Component({
  selector: 'app-ventas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EsqueletoListado],
  templateUrl: './ventas.html',
})
export class Ventas {
  private readonly listarVentas = inject(ListarVentas);

  protected readonly estado = signal<EstadoCarga>('cargando');
  protected readonly ventas = signal<Venta[]>([]);

  constructor() {
    this.cargar();
  }

  private async cargar(): Promise<void> {
    try {
      this.ventas.set(await this.listarVentas.ejecutar());
      this.estado.set('listo');
    } catch (error) {
      console.error('No se pudieron cargar las ventas', error);
      this.estado.set('error');
    }
  }
}
