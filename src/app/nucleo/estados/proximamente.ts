import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icono } from '../icono/icono';

// Aviso de sección en construcción
@Component({
  selector: 'app-proximamente',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono],
  template: `
    <section class="proximamente" aria-labelledby="titulo-proximamente">
      <span class="proximamente__icono" aria-hidden="true">
        <app-icono nombre="herramienta" [tamano]="28" />
      </span>
      <h2 class="proximamente__titulo" id="titulo-proximamente">Próximamente</h2>
      <p class="proximamente__texto">Esta sección todavía está en construcción.</p>
    </section>
  `,
  styles: `
    .proximamente {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--espacio-3);
      margin-block-start: var(--espacio-4);
      padding: var(--espacio-8) var(--espacio-4);
      text-align: center;
      background-color: var(--color-superficie);
      border: 1px dashed var(--color-neutro-borde);
      border-radius: var(--radio-tarjeta);
    }

    .proximamente__icono {
      display: grid;
      place-items: center;
      inline-size: 72px;
      block-size: 72px;
      color: var(--color-acento-suave-texto);
      background-color: var(--color-acento-suave);
      border-radius: 50%;
    }

    .proximamente__titulo {
      font-size: 1.125rem;
      line-height: 1.5;
    }

    .proximamente__texto {
      color: var(--color-texto-secundario);
    }
  `,
})
export class Proximamente {}
