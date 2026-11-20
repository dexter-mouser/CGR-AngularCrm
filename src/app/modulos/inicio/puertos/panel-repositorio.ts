import { InjectionToken } from '@angular/core';
import type {
  EncabezadoPanel,
  IdIndicador,
  Indicador,
  VentaDia,
  VentaReciente,
} from '../dominio/panel';

// Puerto: cada bloque del panel se pide por separado para que cargue a su ritmo
export interface PanelRepositorio {
  obtenerEncabezado(): Promise<EncabezadoPanel>;
  obtenerIndicador(id: IdIndicador): Promise<Indicador>;
  obtenerVentasSemana(): Promise<VentaDia[]>;
  obtenerUltimasVentas(): Promise<VentaReciente[]>;
}

// Token para enlazar el puerto con su adaptador (ver config/proveedores.ts)
export const PANEL_REPOSITORIO = new InjectionToken<PanelRepositorio>('PanelRepositorio');
