import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  senha = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit() {
    try {
      const response = await this.authService.login({ usuario: this.usuario, senha: this.senha }).toPromise();
      this.authService.setToken(response.token);
      const perfil = this.authService.getPerfil();
      if (perfil === 'ADM') {
        this.router.navigate(['/admin/dashboard']);
      } else if (perfil === 'PROFESSOR') {
        this.router.navigate(['/professor/dashboard']);
      } else if (perfil === 'ALUNO') {
        this.router.navigate(['/aluno/dashboard']);
      } else {
        this.errorMessage = 'Perfil desconhecido.';
      }
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Erro ao fazer login. Verifique suas credenciais.';
    }
  }
}


