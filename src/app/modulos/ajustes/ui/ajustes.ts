import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { EstadoMenuLateral } from '../../../nucleo/servicios/estado-menu-lateral';
import { Preferencias, type Densidad, type Marca } from '../../../nucleo/servicios/preferencias';
import { Tema, type PreferenciaTema } from '../../../nucleo/servicios/tema';

interface Opcion {
  valor: string;
  etiqueta: string;
}

interface Grupo {
  id: string;
  titulo: string;
  opciones: readonly Opcion[];
  actual: string;
  elegir: (valor: string) => void;
}

// Ajustes de la interfaz: tema, densidad, menú lateral y color de marca
@Component({
  selector: 'app-ajustes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Ajustes</h1>

    <div class="ajustes tarjeta">
      @for (grupo of grupos(); track grupo.id) {
        <fieldset class="ajuste">
          <legend class="ajuste__titulo">{{ grupo.titulo }}</legend>
          <div class="ajuste__opciones">
            @for (opcion of grupo.opciones; track opcion.valor) {
              <label class="opcion">
                <input
                  type="radio"
                  [name]="grupo.id"
                  [value]="opcion.valor"
                  [checked]="opcion.valor === grupo.actual"
                  (change)="grupo.elegir(opcion.valor)"
                />
                {{ opcion.etiqueta }}
              </label>
            }
          </div>
        </fieldset>
      }
    </div>
  `,
  styles: `
    .ajustes {
      display: flex;
      flex-direction: column;
      margin-block-start: var(--espacio-6);
      padding-inline: var(--espacio-4);
    }

    .ajuste {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--espacio-3);
      margin: 0;
      padding: var(--espacio-4) 0;
      border: 0;

      & + & {
        border-block-start: var(--borde);
      }
    }

    // La leyenda va en línea con las opciones
    .ajuste__titulo {
      float: inline-start;
      padding: 0;
      color: var(--color-texto);
    }

    .ajuste__opciones {
      display: flex;
      flex-wrap: wrap;
      gap: var(--espacio-2);
    }

    /* Opción como chip: elegida en tonal, el resto en gris */
    .opcion {
      position: relative;
      display: inline-flex;
      align-items: center;
      min-block-size: 40px;
      padding-inline: var(--espacio-3);
      color: var(--color-neutro-texto);
      background-color: var(--color-superficie);
      border: 1px solid var(--color-neutro-borde);
      border-radius: var(--radio);
      cursor: pointer;
      transition:
        background-color var(--duracion-corta) ease,
        border-color var(--duracion-corta) ease;

      &:hover {
        border-color: var(--color-borde-campo);
      }

      &:has(input:checked) {
        font-weight: 600;
        color: var(--color-acento-suave-texto);
        background-color: var(--color-acento-suave);
        border-color: var(--color-acento-suave-borde);
      }

      &:has(input:focus-visible) {
        outline: 2px solid var(--color-foco);
        outline-offset: 2px;
      }
    }

    // El radio queda accesible pero invisible: el chip completo es la opción
    input {
      position: absolute;
      inset: 0;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }

    @media (forced-colors: active) {
      .opcion:has(input:checked) {
        outline: 2px solid Highlight;
      }
    }
  `,
})
export class Ajustes {
  private readonly tema = inject(Tema);
  private readonly preferencias = inject(Preferencias);
  private readonly menuLateral = inject(EstadoMenuLateral);

  protected readonly grupos = computed<Grupo[]>(() => [
    {
      id: 'tema',
      titulo: 'Tema',
      opciones: [
        { valor: 'claro', etiqueta: 'Claro' },
        { valor: 'oscuro', etiqueta: 'Oscuro' },
        { valor: 'automatico', etiqueta: 'Automático' },
      ],
      actual: this.tema.preferencia(),
      elegir: (valor) => this.tema.elegir(valor as PreferenciaTema),
    },
    {
      id: 'densidad',
      titulo: 'Densidad',
      opciones: [
        { valor: 'comoda', etiqueta: 'Cómoda' },
        { valor: 'compacta', etiqueta: 'Compacta' },
      ],
      actual: this.preferencias.densidad(),
      elegir: (valor) => this.preferencias.elegirDensidad(valor as Densidad),
    },
    {
      id: 'menu',
      titulo: 'Menú lateral',
      opciones: [
        { valor: 'expandido', etiqueta: 'Expandido' },
        { valor: 'iconos', etiqueta: 'Solo iconos' },
      ],
      actual: this.menuLateral.estaRecogido() ? 'iconos' : 'expandido',
      elegir: (valor) => this.menuLateral.fijar(valor === 'iconos'),
    },
    {
      id: 'marca',
      titulo: 'Color de marca',
      opciones: [
        { valor: 'naranja', etiqueta: 'Naranja' },
        { valor: 'azul', etiqueta: 'Azul' },
        { valor: 'verde', etiqueta: 'Verde' },
        { valor: 'violeta', etiqueta: 'Violeta' },
      ],
      actual: this.preferencias.marca(),
      elegir: (valor) => this.preferencias.elegirMarca(valor as Marca),
    },
  ]);
}
