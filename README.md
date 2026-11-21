# CGR CRM

CRM empresarial en Angular. Por ahora es la base del proyecto: login de maqueta, layout con menú lateral y cabecera, módulos Inicio, Ventas, Clientes, Inventario, Finanzas y Ajustes, y una página de cuadrícula numerada para ubicar elementos en las próximas vistas. Todavía no tiene backend: los datos salen de adaptadores en memoria que luego se cambiarán por Supabase o una API propia.

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
| `/inicio` | Inicio › Panel: «Próximamente» |
| `/inicio/reportes` | Inicio › Reportes: «Próximamente» |
| `/inventario` | Inventario: «Próximamente» |
| `/ventas` | Ventas: «Próximamente» |
| `/clientes` | Clientes: «Próximamente» |
| `/finanzas` | Finanzas: «Próximamente» |
| `/ajustes` | Ajustes: tema, densidad, menú lateral y color de marca |
| `/ubicacion` | Ubicación espacial: cuadrícula de 12 × 12 celdas numeradas del 1 al 144. No aparece en el menú, se abre escribiendo la ruta |
| Otra | Página no encontrada |

## Estructura
```
src/
├── index.html                 Tema guardado aplicado antes de pintar
├── styles/                    Estilos globales
│   ├── estilos.scss           Entrada (la usa angular.json)
│   ├── _variables.scss        Grises, colores de marca, tokens claro/oscuro, densidad, forma, movimiento y medidas
│   ├── _base.scss             Reinicio, tipografía y foco
│   ├── _utilidades.scss       Botón de icono, contenedor, texto para lectores, visibilidad por tema
│   ├── _botones.scss          Botón principal, secundario e indicador de giro
│   ├── _paginas.scss          Tarjeta y listados
│   ├── _esqueleto.scss        Piezas de carga que pulsan
│   └── _etiquetas.scss        Etiquetas de acento, neutras y de estado
└── app/
    ├── app.ts, app.config.ts
    ├── app.routes.ts          Rutas generadas desde los módulos activos
    ├── config/
    │   ├── general.ts         Constantes: nombre, claves de localStorage, tiempos de carga, cuadrícula
    │   ├── modulos.ts         Módulos activos (rutas y menú lateral)
    │   └── proveedores.ts     Enlace de cada puerto con su adaptador
    ├── nucleo/
    │   ├── modulo.ts          Contrato de un módulo
    │   ├── esqueleto/         Componente Esqueleto, zona de carga, lógica de carga (Carga), actividad global y esqueletos de listado y página
    │   ├── estados/           Aviso «Próximamente» y estado de error de un bloque
    │   ├── icono/             Iconos SVG en línea
    │   ├── layout/            Layout, menú lateral, cabecera (menu-superior), migas y barra de carga
    │   ├── no-encontrada/     Página 404
    │   ├── servicios/         Almacenamiento, tema, preferencias (densidad y marca) y estado del menú lateral
    │   ├── tema/              Botón de tema claro/oscuro
    │   └── utilidades/        Funciones pequeñas compartidas (esperar, iniciales)
    └── modulos/
        ├── ajustes/           modulo.ts + ui/ (página de ajustes)
        ├── acceso/            dominio/ aplicacion/ puertos/ adaptadores/ ui/ (login)
        ├── inicio/            modulo.ts (con submenú Panel / Reportes) + ui/
        ├── clientes/          modulo.ts + ui/
        ├── finanzas/          modulo.ts + ui/
        ├── ubicacion/ui/      Cuadrícula de referencia
        ├── inventario/        modulo.ts + dominio/ aplicacion/ puertos/ adaptadores/ ui/
        └── ventas/            modulo.ts + dominio/ aplicacion/ puertos/ adaptadores/ ui/
```

## Arquitectura

### Núcleo y módulos
Cada función del CRM es un módulo en `modulos/<nombre>/`. Su `modulo.ts` cumple el contrato de `nucleo/modulo.ts`: nombre, ruta, opción de menú (etiqueta, icono y si va arriba o al pie), la página que carga y, si tiene, su submenú (cada subpágina crea su propia ruta, como `/inicio/reportes`). `config/modulos.ts` lista los módulos activos; a partir de esa lista se crean las rutas (con carga diferida) y el menú lateral. Quitar un módulo de la lista lo saca de las rutas y del menú sin romper nada. Un módulo nunca importa otro módulo.

### Hexagonal (puertos y adaptadores)
Los módulos con datos (Acceso, Inventario y Ventas) se dividen en capas:

| Capa | Qué contiene | Puede importar |
| --- | --- | --- |
| `dominio/` | Entidades y reglas en TypeScript puro (`Producto`, `Venta`, `Indicador`, `saludoSegunHora`) | Nada |
| `puertos/` | Interfaz del repositorio y su `InjectionToken` | `dominio/` |
| `aplicacion/` | Casos de uso (`ListarProductos`, `Ingresar`…), sin Angular | `dominio/`, `puertos/` (solo tipos) |
| `adaptadores/` | Implementaciones del puerto (`ProductosEnMemoria`, `AccesoEnMemoria`…) | `dominio/`, `puertos/` |
| `ui/` | Página Angular; usa solo el caso de uso | `aplicacion/` (y tipos de `dominio/`) |

`config/proveedores.ts` enlaza cada puerto con su adaptador y construye los casos de uso. Esos proveedores se registran en la ruta de cada módulo (el login usa los de `acceso`).

Las entidades de Inventario y Ventas solo tienen `id` y `nombre`: el modelo de datos real se decide más adelante.

### Agregar un adaptador (por ejemplo, Supabase)
1. Crear `modulos/inventario/adaptadores/productos-supabase.ts` con una clase que implemente `ProductosRepositorio`.
2. En `config/proveedores.ts`, cambiar `useClass: ProductosEnMemoria` por `useClass: ProductosSupabase`.

No hace falta tocar el dominio, los casos de uso ni las páginas.

## Cómo funciona
- **Login:** maqueta sin validación ni autenticación. Primero carga la marca de la tienda y el acceso de prueba (con esqueleto). «Copiar» llena el campo Usuario, lo copia al portapapeles y muestra «Copiado» durante 2 s. Al ingresar, el botón muestra «Ingresando…» con un indicador de giro y los campos se bloquean. El ojo muestra u oculta la clave. «Cerrar sesión», al final del menú lateral, vuelve al login.
- **Layout:** menú lateral a la izquierda; a la derecha, una cabecera con migas de pan (Inicio / página actual, cada nivel se puede pulsar) y el botón de tema. Mientras algo carga, una barra de 2 px en el color de acento recorre el borde inferior de la cabecera. Al cambiar de página el contenido entra con un fundido y un desplazamiento de 4 px (280 ms); sin animaciones si el sistema pide reducir el movimiento.
- **Menú lateral:** marca arriba; Inicio (con submenú Panel / Reportes), Ventas, Clientes, Inventario y Finanzas; al pie, Ajustes, Cerrar sesión y el usuario con sus iniciales. Inicio es un desplegable: pulsarlo abre o cierra Panel y Reportes sin cambiar de página. El submenú empieza cerrado y solo al abrirlo aparece, con una línea a la izquierda. Inicio se marca como activo mientras estás en cualquiera de sus páginas. Al pasar el cursor, un fondo gris se desliza hasta la opción; la activa lleva fondo tonal, una línea de acento a la izquierda y negrita. Se recoge a solo iconos con el botón de la cabecera o en Ajustes (`cgr-menu-recogido`). En celular (menos de 768 px) pasa a una barra inferior fija con los módulos, Ajustes y Cerrar sesión, sin submenús (Inicio lleva directo al Panel).
- **Secciones en construcción:** todas menos Ajustes muestran el aviso «Próximamente» (`nucleo/estados/proximamente.ts`). Inventario y Ventas conservan sus capas de datos para cuando se construyan.
- **Ajustes:** tema claro, oscuro o automático (`cgr-tema`), densidad cómoda o compacta (`cgr-densidad`), menú lateral expandido o solo iconos y color de marca naranja/ámbar, azul, verde o violeta (`cgr-marca`). Densidad y marca se aplican como `data-densidad` y `data-marca` en `<html>`, que solo cambian variables CSS. `index.html` aplica todo antes de pintar para evitar destellos. El color de marca por defecto de cada cliente está en `MARCA_POR_DEFECTO` (`config/general.ts`).
- **Tema claro/oscuro:** por defecto sigue el tema del sistema. El botón de la cabecera (luna en claro, sol en oscuro) cambia al tema contrario; si coincide con el del sistema, vuelve a automático.
- **Esqueletos de carga:** ver [docs/carga.md](docs/carga.md).
- **Demora simulada:** los adaptadores en memoria esperan `DEMORA_SIMULADA_MS` (1,5 s, en `config/general.ts`) antes de responder, para que el esqueleto se vea. Se quita al conectar el backend real.
- **Estilo:** grises neutros de 13 tonos; acento naranja `#C2410C` en claro y ámbar `#FBBF24` en oscuro para cifras, gráficas y foco. El botón principal, el menú activo y las etiquetas de acento son tonales (fondo suave del acento con texto del acento); el secundario y las etiquetas neutras van en gris. Radio de 8 px en botones, tarjetas, campos y menú; 12 px en ventanas flotantes. Iconos lineales con trazo de 1.5 px. Todo sale de variables CSS en `styles/_variables.scss` con `light-dark(claro, oscuro)`. El contenido vive en un contenedor de 320 px a 1200 px de ancho.
