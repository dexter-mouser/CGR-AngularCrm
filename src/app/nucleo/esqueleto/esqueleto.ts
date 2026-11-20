import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type VarianteEsqueleto = 'texto' | 'circulo' | 'rectangulo' | 'boton';

// Medidas por defecto de cada variante (el texto usa el alto de línea de donde se coloque)
const MEDIDAS: Record<VarianteEsqueleto, { ancho: string; alto: string }> = {
  texto: { ancho: '100%', alto: '1lh' },
  circulo: { ancho: '40px', alto: '40px' },
  rectangulo: { ancho: '100%', alto: '120px' },
  boton: { ancho: '120px', alto: '44px' },
};

// Pieza de esqueleto decorativa: el aviso «Cargando…» lo pone la zona de carga que la contiene
@Component({
  selector: 'app-esqueleto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'esqueleto',
    'aria-hidden': 'true',
    '[class.esqueleto--texto]': "variante() === 'texto'",
    '[class.esqueleto--circulo]': "variante() === 'circulo'",
    '[style.inline-size]': 'anchoFinal()',
    '[style.block-size]': 'altoFinal()',
  },
  template: '',
})
export class Esqueleto {
  readonly variante = input<VarianteEsqueleto>('texto');
  readonly ancho = input<string>();
  readonly alto = input<string>();

  protected readonly anchoFinal = computed(() => this.ancho() ?? MEDIDAS[this.variante()].ancho);
  protected readonly altoFinal = computed(() => this.alto() ?? MEDIDAS[this.variante()].alto);
}
