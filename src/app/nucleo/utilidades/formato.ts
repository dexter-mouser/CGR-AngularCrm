import { IDIOMA, MONEDA } from '../../config/general';

const formatoMoneda = new Intl.NumberFormat(IDIOMA, {
  style: 'currency',
  currency: MONEDA,
  maximumFractionDigits: 0,
});

const formatoNumero = new Intl.NumberFormat(IDIOMA);

// Valor en la moneda configurada, sin decimales
export function formatearMoneda(valor: number): string {
  return formatoMoneda.format(valor);
}

// Cantidad con separador de miles
export function formatearNumero(valor: number): string {
  return formatoNumero.format(valor);
}
