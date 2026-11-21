import { moduloAjustes } from '../modulos/ajustes/modulo';
import { moduloClientes } from '../modulos/clientes/modulo';
import { moduloFinanzas } from '../modulos/finanzas/modulo';
import { moduloInicio } from '../modulos/inicio/modulo';
import { moduloInventario } from '../modulos/inventario/modulo';
import { moduloVentas } from '../modulos/ventas/modulo';
import { ModuloAplicacion } from '../nucleo/modulo';

// Módulos activos, en el orden del menú lateral. Quitar uno lo saca de las rutas y del menú.
export const MODULOS_ACTIVOS: readonly ModuloAplicacion[] = [
  moduloInicio,
  moduloVentas,
  moduloClientes,
  moduloInventario,
  moduloFinanzas,
  moduloAjustes,
];
