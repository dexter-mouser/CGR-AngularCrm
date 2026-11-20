import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NOMBRE_APLICACION } from '../../../config/general';
import { Icono } from '../../../nucleo/icono/icono';

// Login de maqueta: todavía no valida ni autentica, solo entra al panel
@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);

  protected readonly nombreAplicacion = NOMBRE_APLICACION;
  protected readonly claveVisible = signal(false);

  protected alternarClave(): void {
    this.claveVisible.update((visible) => !visible);
  }

  protected ingresar(evento: SubmitEvent): void {
    evento.preventDefault();
    this.router.navigateByUrl('/inicio');
  }
}
