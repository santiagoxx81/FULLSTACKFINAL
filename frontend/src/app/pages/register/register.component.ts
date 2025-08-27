import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario = '';
  senha = '';
  perfil = 'ALUNO'; // Default para ALUNO
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit() {
    try {
      const response = await this.authService.register({ usuario: this.usuario, senha: this.senha, perfil: this.perfil }).toPromise();
      this.successMessage = response.message;
      this.errorMessage = '';
      // Optionally redirect to login after successful registration
      // this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Erro ao registrar. Tente novamente.';
      this.successMessage = '';
    }
  }
}


