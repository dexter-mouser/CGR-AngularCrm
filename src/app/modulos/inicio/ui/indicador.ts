import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { Carga } from '../../../nucleo/esqueleto/carga';
import { Esqueleto } from '../../../nucleo/esqueleto/esqueleto';
import { ZonaCarga } from '../../../nucleo/esqueleto/zona-carga';
import { EstadoError } from '../../../nucleo/estados/estado-error';
import { Icono } from '../../../nucleo/icono/icono';
import { formatearMoneda, formatearNumero } from '../../../nucleo/utilidades/formato';
import { ConsultarPanel } from '../aplicacion/consultar-panel';
import { TITULOS_INDICADORES, type IdIndicador } from '../dominio/panel';

// Teclas que mueven el indicador: antes o después en el orden
const DIRECCION_POR_TECLA: Record<string, -1 | 1> = {
  ArrowLeft: -1,
  ArrowUp: -1,
  ArrowRight: 1,
  ArrowDown: 1,
};

// Un indicador del panel: carga sus datos por su cuenta y avisa cuando lo quieren mover
@Component({
  selector: 'app-indicador',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Esqueleto, ZonaCarga, EstadoError, Icono],
  host: {
    class: 'indicador tarjeta',
    '[attr.aria-busy]': 'carga.estaCargando()',
    '[class.indicador--arrastrando]': 'arrastrando()',
    '[class.indicador--destino]': 'esDestino()',
  },
  templateUrl: './indicador.html',
  styleUrl: './indicador.scss',
})
export class Indicador implements OnInit {
  private readonly consultar = inject(ConsultarPanel);

  readonly id = input.required<IdIndicador>();
  readonly arrastrando = input(false);
  readonly esDestino = input(false);
  readonly agarrar = output<PointerEvent>();
  readonly mover = output<-1 | 1>();

  protected readonly carga = new Carga(() => this.consultar.indicador(this.id()));
  protected readonly titulo = computed(() => TITULOS_INDICADORES[this.id()]);

  protected readonly valorFormateado = computed(() => {
    const indicador = this.carga.datos();
    if (!indicador) return '';
    return indicador.formato === 'moneda'
      ? formatearMoneda(indicador.valor)
      : formatearNumero(indicador.valor);
  });

  ngOnInit(): void {
    this.carga.cargar();
  }

  protected alPulsarTecla(evento: KeyboardEvent): void {
    const direccion = DIRECCION_POR_TECLA[evento.key];
    if (!direccion) return;
    evento.preventDefault();
    this.mover.emit(direccion);
  }
}
