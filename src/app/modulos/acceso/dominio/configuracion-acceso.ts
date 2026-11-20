// Datos de la tienda que necesita el login antes de mostrarse
export interface ConfiguracionAcceso {
  nombreTienda: string;
  accesoPrueba: {
    usuario: string;
    rol: string;
  };
}
