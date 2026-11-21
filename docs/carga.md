# Carga, esqueletos y estados de un bloque

## Piezas
| Pieza | Dónde | Qué hace |
| --- | --- | --- |
| `Carga<T>` | `nucleo/esqueleto/carga.ts` | Pide los datos de un bloque y expone `estado` (`esperando`, `cargando`, `listo`, `error`), `datos`, `estaCargando` y `esqueletoVisible`. `cargar()` también sirve para reintentar |
| `<app-esqueleto>` | `nucleo/esqueleto/esqueleto.ts` | Pieza gris decorativa (`aria-hidden`). Variantes `texto`, `circulo`, `rectangulo` y `boton`, con `ancho` y `alto` opcionales |
| `<app-zona-carga>` | `nucleo/esqueleto/zona-carga.ts` | Envuelve las piezas de un bloque y anuncia «Cargando…» con `role="status"`. No crea caja propia, así las piezas usan la misma distribución que el contenido real |
| `<app-estado-error>` | `nucleo/estados/estado-error.ts` | Mensaje corto y botón «Reintentar» dentro del bloque |

## Reglas
- **Sin parpadeo:** el esqueleto aparece solo si la carga tarda más de `UMBRAL_ESQUELETO_MS` (200 ms) y, una vez visible, se queda al menos `MINIMO_ESQUELETO_MS` (300 ms). Durante el umbral las piezas ocupan su espacio sin verse.
- **Sin saltos:** cada pieza mide lo mismo que el texto o control que reemplaza. La variante `texto` toma el alto de línea del elemento donde se coloca (`1lh`).
- **Colores:** `--color-esqueleto`, con un pulso de opacidad de 1,4 s. Al cambiar de tema el color cambia al instante.
- **Barra de carga:** cuando un esqueleto se hace visible o un cambio de página pasa el umbral, se registra una actividad (`nucleo/esqueleto/actividad.ts`) y la cabecera muestra una barra de 2 px en el color de acento hasta que todas terminan.
- **Movimiento reducido:** sin pulso (color fijo) y la barra de carga queda fija.
- **Accesibilidad:** el bloque lleva `aria-busy` mientras carga y la zona de carga anuncia «Cargando…».

## Uso en un bloque
```html
<section class="tarjeta" [attr.aria-busy]="carga.estaCargando()">
  @switch (carga.estado()) {
    @case ('listo') { <!-- contenido real --> }
    @case ('error') { <app-estado-error (reintentar)="carga.cargar()" /> }
    @default {
      <app-zona-carga [visible]="carga.esqueletoVisible()">
        <app-esqueleto ancho="60%" />
      </app-zona-carga>
    }
  }
</section>
```

