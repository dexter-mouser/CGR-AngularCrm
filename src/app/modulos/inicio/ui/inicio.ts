import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccesosRapidos } from './accesos-rapidos';
import { EncabezadoInicio } from './encabezado-inicio';
import { Indicadores } from './indicadores';
import { UltimasVentas } from './ultimas-ventas';
import { VentasSemana } from './ventas-semana';

// Panel de Inicio: cada bloque carga sus datos por separado
@Component({
  selector: 'app-inicio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EncabezadoInicio, AccesosRapidos, Indicadores, VentasSemana, UltimasVentas],
  template: `
    <div class="inicio">
      <app-encabezado-inicio />
      <app-accesos-rapidos />
      <app-indicadores />
      <div class="inicio__paneles">
        <app-ventas-semana />
        <app-ultimas-ventas />
      </div>
    </div>
  `,
  styles: `
    .inicio {
      display: flex;
      flex-direction: column;
      gap: var(--espacio-6);
    }

    .inicio__paneles {
      display: grid;
      gap: var(--espacio-4);
    }

    @media (width >= 1200px) {
      .inicio__paneles {
        grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
      }
    }
  `,
})
export class Inicio {}
