import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DURACION_COPIADO_MS } from '../../../config/general';
import { Carga } from '../../../nucleo/esqueleto/carga';
import { Esqueleto } from '../../../nucleo/esqueleto/esqueleto';
import { ZonaCarga } from '../../../nucleo/esqueleto/zona-carga';
import { EstadoError } from '../../../nucleo/estados/estado-error';
import { Icono } from '../../../nucleo/icono/icono';
import { BotonTema } from '../../../nucleo/tema/boton-tema';
import { Ingresar, ObtenerConfiguracionAcceso } from '../aplicacion/acceso';

// Login de maqueta: carga la marca de la tienda y entra al panel sin validar
@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icono, BotonTema, Esqueleto, ZonaCarga, EstadoError],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);
  private readonly obtenerConfiguracion = inject(ObtenerConfiguracionAcceso);
  private readonly ingresarAlSistema = inject(Ingresar);

  protected readonly carga = new Carga(() => this.obtenerConfiguracion.ejecutar());
  protected readonly usuario = signal('');
  protected readonly claveVisible = signal(false);
  protected readonly ingresando = signal(false);
  protected readonly falloIngreso = signal(false);
  protected readonly copiado = signal(false);

  private temporizadorCopiado: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.carga.cargar();
    inject(DestroyRef).onDestroy(() => clearTimeout(this.temporizadorCopiado));
  }

  protected alternarClave(): void {
    this.claveVisible.update((visible) => !visible);
  }

  protected actualizarUsuario(evento: Event): void {
    this.usuario.set((evento.target as HTMLInputElement).value);
  }

  // Llena el campo de usuario y, si el navegador lo permite, también lo copia al portapapeles
  protected async copiarUsuario(usuarioPrueba: string): Promise<void> {
    this.usuario.set(usuarioPrueba);
    try {
      await navigator.clipboard.writeText(usuarioPrueba);
    } catch (error) {
      console.error('No se pudo copiar al portapapeles', error);
    }
    this.copiado.set(true);
    clearTimeout(this.temporizadorCopiado);
    this.temporizadorCopiado = setTimeout(() => this.copiado.set(false), DURACION_COPIADO_MS);
  }

  protected async ingresar(evento: SubmitEvent): Promise<void> {
    evento.preventDefault();
    if (this.ingresando()) return;

    // Se leen antes de bloquear los campos: un campo deshabilitado no se envía
    const datos = new FormData(evento.target as HTMLFormElement);
    this.falloIngreso.set(false);
    this.ingresando.set(true);

    try {
      await this.ingresarAlSistema.ejecutar(
        String(datos.get('usuario') ?? ''),
        String(datos.get('clave') ?? ''),
      );
      await this.router.navigateByUrl('/inicio');
    } catch (error) {
      console.error('No se pudo ingresar', error);
      this.falloIngreso.set(true);
    } finally {
      this.ingresando.set(false);
    }
  }
}
