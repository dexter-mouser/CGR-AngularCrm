import {
  limitarProgreso,
  type EncabezadoPanel,
  type IdIndicador,
  type Indicador,
  type VentaDia,
  type VentaReciente,
} from '../dominio/panel';
import type { PanelRepositorio } from '../puertos/panel-repositorio';

// Caso de uso: consultar los bloques del panel de Inicio
export class ConsultarPanel {
  constructor(private readonly repositorio: PanelRepositorio) {}

  encabezado(): Promise<EncabezadoPanel> {
    return this.repositorio.obtenerEncabezado();
  }

  async indicador(id: IdIndicador): Promise<Indicador> {
    const indicador = await this.repositorio.obtenerIndicador(id);
    return { ...indicador, progreso: limitarProgreso(indicador.progreso) };
  }

  ventasSemana(): Promise<VentaDia[]> {
    return this.repositorio.obtenerVentasSemana();
  }

  ultimasVentas(): Promise<VentaReciente[]> {
    return this.repositorio.obtenerUltimasVentas();
  }
}
