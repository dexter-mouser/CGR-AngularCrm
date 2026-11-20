// Entidades y reglas del panel de Inicio (TypeScript puro)

export interface EncabezadoPanel {
  nombreUsuario: string;
  sucursal: string;
}

export const IDS_INDICADORES = [
  'ventas-dia',
  'efectivo-caja',
  'creditos-pendientes',
  'productos-negativo',
] as const;

export type IdIndicador = (typeof IDS_INDICADORES)[number];

export const TITULOS_INDICADORES: Record<IdIndicador, string> = {
  'ventas-dia': 'Ventas del día',
  'efectivo-caja': 'Efectivo en caja',
  'creditos-pendientes': 'Créditos pendientes',
  'productos-negativo': 'Productos en negativo',
};

// Qué tan urgente es un valor: los que piden atención se destacan con color
export type Atencion = 'normal' | 'aviso' | 'error';

export interface Indicador {
  id: IdIndicador;
  titulo: string;
  valor: number;
  formato: 'moneda' | 'cantidad';
  /** Avance de la barra, de 0 a 1 */
  progreso: number;
  apoyo: string;
  atencion: Atencion;
}

export interface VentaDia {
  dia: string;
  total: number;
}

export interface VentaReciente {
  id: string;
  cliente: string;
  detalle: string;
  monto: number;
}

const HORA_TARDE = 12;
const HORA_NOCHE = 19;

export function saludoSegunHora(hora: number): string {
  if (hora < HORA_TARDE) return 'Buenos días';
  if (hora < HORA_NOCHE) return 'Buenas tardes';
  return 'Buenas noches';
}

// Hasta dos iniciales del nombre, en mayúscula
export function iniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  return partes
    .slice(0, 2)
    .map((parte) => parte[0].toLocaleUpperCase('es'))
    .join('');
}

export function limitarProgreso(valor: number): number {
  if (!Number.isFinite(valor)) return 0;
  return Math.min(1, Math.max(0, valor));
}

export function semanaSinVentas(dias: readonly VentaDia[]): boolean {
  return dias.every((dia) => dia.total <= 0);
}

// Orden guardado: solo se acepta si trae exactamente los indicadores conocidos
export function validarOrdenIndicadores(valor: unknown): IdIndicador[] | null {
  if (!Array.isArray(valor) || valor.length !== IDS_INDICADORES.length) return null;
  const conocidos = new Set<string>(IDS_INDICADORES);
  const unicos = new Set(valor);
  const esValido = unicos.size === valor.length && valor.every((id) => conocidos.has(id));
  return esValido ? (valor as IdIndicador[]) : null;
}

// Copia de la lista con un elemento movido a otra posición (acotada a los extremos)
export function moverElemento<T>(lista: readonly T[], desde: number, hasta: number): T[] {
  const copia = [...lista];
  const destino = Math.min(copia.length - 1, Math.max(0, hasta));
  const [elemento] = copia.splice(desde, 1);
  copia.splice(destino, 0, elemento);
  return copia;
}
