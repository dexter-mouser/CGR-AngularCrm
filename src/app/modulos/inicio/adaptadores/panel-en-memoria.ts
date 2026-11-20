import { DEMORA_SIMULADA_MS, USUARIO_DE_MUESTRA } from '../../../config/general';
import { esperar } from '../../../nucleo/utilidades/esperar';
import {
  TITULOS_INDICADORES,
  type EncabezadoPanel,
  type IdIndicador,
  type Indicador,
  type VentaDia,
  type VentaReciente,
} from '../dominio/panel';
import type { PanelRepositorio } from '../puertos/panel-repositorio';

/*
 * Escenario de prueba, elegido con ?escenario= en la dirección (solo mientras no hay backend):
 * - datos (por defecto): todo con datos
 * - vacio: sin ventas ni movimientos
 * - error: Ventas de la semana, Últimas ventas y Efectivo en caja fallan la primera vez; «Reintentar» funciona
 */
type Escenario = 'datos' | 'vacio' | 'error';

function leerEscenario(): Escenario {
  const valor = new URLSearchParams(globalThis.location?.search ?? '').get('escenario');
  return valor === 'vacio' || valor === 'error' ? valor : 'datos';
}

// Cada bloque tarda distinto para ver que cargan por separado
const DEMORAS = {
  encabezado: DEMORA_SIMULADA_MS * 0.6,
  indicador: DEMORA_SIMULADA_MS * 0.8,
  pasoIndicador: DEMORA_SIMULADA_MS * 0.2,
  semana: DEMORA_SIMULADA_MS * 1.2,
  ultimas: DEMORA_SIMULADA_MS * 1.5,
};

const INDICADORES: Record<IdIndicador, Indicador> = {
  'ventas-dia': {
    id: 'ventas-dia',
    titulo: TITULOS_INDICADORES['ventas-dia'],
    valor: 1_250_000,
    formato: 'moneda',
    progreso: 0.62,
    apoyo: '62 % de la meta del día',
    atencion: 'normal',
  },
  'efectivo-caja': {
    id: 'efectivo-caja',
    titulo: TITULOS_INDICADORES['efectivo-caja'],
    valor: 0,
    formato: 'moneda',
    progreso: 0,
    apoyo: 'La caja aún no se ha abierto',
    atencion: 'normal',
  },
  'creditos-pendientes': {
    id: 'creditos-pendientes',
    titulo: TITULOS_INDICADORES['creditos-pendientes'],
    valor: 380_000,
    formato: 'moneda',
    progreso: 0.38,
    apoyo: '3 clientes con saldo por cobrar',
    atencion: 'aviso',
  },
  'productos-negativo': {
    id: 'productos-negativo',
    titulo: TITULOS_INDICADORES['productos-negativo'],
    valor: 4,
    formato: 'cantidad',
    progreso: 4 / 120,
    apoyo: '4 de 120 productos con existencia negativa',
    atencion: 'error',
  },
};

const SEMANA: VentaDia[] = [
  { dia: 'Lun', total: 820_000 },
  { dia: 'Mar', total: 1_140_000 },
  { dia: 'Mié', total: 560_000 },
  { dia: 'Jue', total: 1_480_000 },
  { dia: 'Vie', total: 1_910_000 },
  { dia: 'Sáb', total: 2_240_000 },
  { dia: 'Dom', total: 1_250_000 },
];

const ULTIMAS_VENTAS: VentaReciente[] = [
  { id: 'v-105', cliente: 'Laura Gómez', detalle: '10:42 · Efectivo', monto: 185_000 },
  { id: 'v-104', cliente: 'Andrés Rojas', detalle: '10:15 · Tarjeta', monto: 92_500 },
  { id: 'v-103', cliente: 'Cliente de mostrador', detalle: '09:58 · Efectivo', monto: 34_000 },
  { id: 'v-102', cliente: 'María Fernanda Ruiz', detalle: '09:31 · Crédito', monto: 420_000 },
  { id: 'v-101', cliente: 'Carlos Pérez', detalle: '09:05 · Transferencia', monto: 518_500 },
];

// Adaptador provisional sin backend: datos fijos con demora simulada
export class PanelEnMemoria implements PanelRepositorio {
  private readonly escenario = leerEscenario();
  private readonly fallosPendientes = new Set(['semana', 'ultimas', 'efectivo-caja']);

  async obtenerEncabezado(): Promise<EncabezadoPanel> {
    await esperar(DEMORAS.encabezado);
    return { nombreUsuario: USUARIO_DE_MUESTRA, sucursal: 'Sucursal Centro' };
  }

  async obtenerIndicador(id: IdIndicador): Promise<Indicador> {
    const posicion = Object.keys(INDICADORES).indexOf(id);
    await esperar(DEMORAS.indicador + posicion * DEMORAS.pasoIndicador);
    this.fallarSiCorresponde(id);
    const indicador = INDICADORES[id];
    return this.escenario === 'vacio'
      ? { ...indicador, valor: 0, progreso: 0, apoyo: 'Sin movimientos hoy', atencion: 'normal' }
      : indicador;
  }

  async obtenerVentasSemana(): Promise<VentaDia[]> {
    await esperar(DEMORAS.semana);
    this.fallarSiCorresponde('semana');
    return this.escenario === 'vacio' ? SEMANA.map((dia) => ({ ...dia, total: 0 })) : SEMANA;
  }

  async obtenerUltimasVentas(): Promise<VentaReciente[]> {
    await esperar(DEMORAS.ultimas);
    this.fallarSiCorresponde('ultimas');
    return this.escenario === 'vacio' ? [] : ULTIMAS_VENTAS;
  }

  // En el escenario de error, el bloque falla solo la primera vez
  private fallarSiCorresponde(bloque: string): void {
    if (this.escenario !== 'error' || !this.fallosPendientes.has(bloque)) return;
    this.fallosPendientes.delete(bloque);
    throw new Error(`Fallo simulado en ${bloque}`);
  }
}
