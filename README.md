# CGR CRM

CRM empresarial en Angular. Por ahora es la base del proyecto: login de maqueta, layout con menú superior y lateral, módulos Inicio, Inventario y Ventas, y una página de cuadrícula numerada para ubicar elementos en las próximas vistas. Todavía no tiene backend: los datos salen de adaptadores en memoria que luego se cambiarán por Supabase o una API propia.

## Requisitos
- Node.js `^22.22.3`, `^24.15.0` o `>=26`
- npm

## Instalación y ejecución
```powershell
npm install
```
```powershell
npm start
```
Abre `http://localhost:4200`. Para compilar la versión de producción (queda en `dist/cgr-crm/`):
```powershell
npm run build
```

## Rutas
| Ruta | Página |
| --- | --- |
| `/` | Login (maqueta: «Ingresar» entra a `/inicio` sin validar) |
| `/inicio` | Inicio (vacía) |
| `/inventario` | Inventario: lista de productos |
| `/ventas` | Ventas: lista de ventas |
| `/ubicacion` | Ubicación espacial: cuadrícula de 12 × 12 celdas numeradas del 1 al 144. No aparece en el menú, se abre escribiendo la ruta |
| Otra | Página no encontrada |

## Estructura
```
src/
├── index.html                 Tema guardado aplicado antes de pintar
├── styles/                    Estilos globales
│   ├── estilos.scss           Entrada (la usa angular.json)
│   ├── _variables.scss        Colores claro/oscuro, tipografía, espacios y medidas
│   ├── _base.scss             Reinicio, tipografía y foco
│   ├── _utilidades.scss       Botón de icono, contenedor, texto para lectores, visibilidad por tema
│   ├── _paginas.scss          Elementos comunes de las páginas (listados)
│   ├── _esqueleto.scss        Bloques de carga con animación de pulso
│   └── _etiquetas.scss        Etiquetas de estado (.etiqueta-exito, -error, -aviso, -info)
└── app/
    ├── app.ts, app.config.ts
    ├── app.routes.ts          Rutas generadas desde los módulos activos
    ├── config/
    │   ├── general.ts         Constantes: nombre, usuario de muestra, claves de localStorage, tiempos de carga, cuadrícula
    │   ├── modulos.ts         Módulos activos (rutas y menú lateral)
    │   └── proveedores.ts     Enlace de cada puerto con su adaptador
    ├── nucleo/
    │   ├── modulo.ts          Contrato de un módulo
    │   ├── esqueleto/         Esqueletos de carga de listado y de página
    │   ├── icono/             Iconos SVG en línea
    │   ├── layout/            Layout, menú superior y menú lateral
    │   ├── no-encontrada/     Página 404
    │   ├── servicios/         Almacenamiento, tema y estado del menú lateral
    │   └── utilidades/        Funciones pequeñas compartidas (esperar)
    └── modulos/
        ├── acceso/ui/         Login
        ├── inicio/            modulo.ts + ui/
        ├── ubicacion/ui/      Cuadrícula de referencia
        ├── inventario/        modulo.ts + dominio/ aplicacion/ puertos/ adaptadores/ ui/
        └── ventas/            modulo.ts + dominio/ aplicacion/ puertos/ adaptadores/ ui/
```

## Arquitectura

### Núcleo y módulos
Cada función del CRM es un módulo en `modulos/<nombre>/`. Su `modulo.ts` cumple el contrato de `nucleo/modulo.ts`: nombre, ruta, opción de menú (etiqueta e icono) y la página que carga. `config/modulos.ts` lista los módulos activos; a partir de esa lista se crean las rutas (con carga diferida) y el menú lateral. Quitar un módulo de la lista lo saca de las rutas y del menú sin romper nada. Un módulo nunca importa otro módulo.

### Hexagonal (puertos y adaptadores)
Los módulos con datos (Inventario y Ventas) se dividen en capas:

| Capa | Qué contiene | Puede importar |
| --- | --- | --- |
| `dominio/` | Entidades en TypeScript puro (`Producto`, `Venta`) | Nada |
| `puertos/` | Interfaz del repositorio y su `InjectionToken` | `dominio/` |
| `aplicacion/` | Casos de uso (`ListarProductos`, `ListarVentas`), sin Angular | `dominio/`, `puertos/` (solo tipos) |
| `adaptadores/` | Implementaciones del puerto (`ProductosEnMemoria`, `VentasEnMemoria`) | `dominio/`, `puertos/` |
| `ui/` | Página Angular; usa solo el caso de uso | `aplicacion/` (y tipos de `dominio/`) |

`config/proveedores.ts` enlaza cada puerto con su adaptador y construye los casos de uso. Esos proveedores se registran en la ruta de cada módulo.

Las entidades solo tienen `id` y `nombre`: el modelo de datos real se decide más adelante.

### Agregar un adaptador (por ejemplo, Supabase)
1. Crear `modulos/inventario/adaptadores/productos-supabase.ts` con una clase que implemente `ProductosRepositorio`.
2. En `config/proveedores.ts`, cambiar `useClass: ProductosEnMemoria` por `useClass: ProductosSupabase`.

No hace falta tocar el dominio, los casos de uso ni las páginas.

## Cómo funciona
- **Login:** maqueta sin validación ni autenticación. El ojo muestra u oculta la clave. «Cerrar sesión», al final del menú lateral, vuelve al login.
- **Menú lateral:** se recoge a solo iconos con el botón del menú superior y guarda la elección en `localStorage` (`cgr-menu-recogido`). La opción activa se marca con fondo invertido y negrita. En celular (menos de 768 px) pasa a una barra inferior fija.
- **Tema claro/oscuro:** por defecto sigue el tema del sistema. El botón (luna en claro, sol en oscuro) cambia al tema contrario; si ese tema coincide con el del sistema, se borra lo guardado y se vuelve a seguir al sistema. Se guarda en `localStorage` (`cgr-tema`) y se aplica en `index.html` antes de pintar.
- **Esqueletos de carga:** mientras un listado espera sus datos se ven filas grises con animación de pulso. Al cambiar de página, si el módulo tarda más de `UMBRAL_ESQUELETO_PAGINA_MS` (100 ms) en cargar, se ve un esqueleto de página completa; con menos tiempo no aparece, para evitar parpadeos. Si el sistema pide reducir el movimiento, no hay animación.
- **Demora simulada:** los adaptadores en memoria esperan `DEMORA_SIMULADA_MS` (800 ms, en `config/general.ts`) antes de responder, para que el esqueleto se vea. Se quita al conectar el backend real.
- **Estilo:** paleta con acento azul petróleo y colores de estado (éxito, error, aviso, info), definida con `light-dark(claro, oscuro)` en `styles/_variables.scss`. Los campos y botones de icono usan `--borde-campo`; tarjetas y menús, `--borde`. El contenido vive en un contenedor de 320 px a 1200 px de ancho.
