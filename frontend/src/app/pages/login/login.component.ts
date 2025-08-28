// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // <- plural e array
})
export class LoginComponent {
  usuario = '';
  senha = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async onSubmit() {
    this.errorMessage = '';

    try {
      // chama o serviço e aguarda a resposta
      const resp: any = await firstValueFrom(
        this.authService.login({ usuario: this.usuario, senha: this.senha })
      );

      // salva credenciais
      localStorage.setItem('token', resp?.token ?? '');
      localStorage.setItem('perfil', resp?.perfil ?? '');

      // verifica redirect solicitado pelo guard
      const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');

      // normaliza o perfil que veio do backend
      const perfil = (resp?.perfil || '').toUpperCase();

      if (redirectTo) {
        this.router.navigateByUrl(redirectTo);
        return;
      }

      // aceita ADM e ADMIN para o dashboard de admin
      if (perfil === 'ADM' || perfil === 'ADMIN') {
        this.router.navigate(['/admin/dashboard']);
      } else if (perfil === 'PROFESSOR') {
        this.router.navigate(['/professor/dashboard']);
      } else if (perfil === 'ALUNO') {
        this.router.navigate(['/aluno/dashboard']);
      } else {
        this.errorMessage = 'Perfil desconhecido.';
      }
    } catch (error: any) {
      this.errorMessage =
        error?.error?.message || 'Erro ao fazer login. Verifique suas credenciais.';
    }
  }
}
