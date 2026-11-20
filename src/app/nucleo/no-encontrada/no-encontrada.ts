import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Página 404
@Component({
  selector: 'app-no-encontrada',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <main class="no-encontrada">
      <h1>Página no encontrada</h1>
      <p class="texto-suave">La dirección no existe.</p>
      <a routerLink="/inicio">Ir al inicio</a>
    </main>
  `,
  styles: `
    .no-encontrada {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--espacio-4);
      min-block-size: 100dvh;
      padding: var(--espacio-4);
      text-align: center;
    }
  `,
})
export class NoEncontrada {}
