import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  getDashboardLink(): string {
    const perfil = this.authService.getPerfil();
    if (perfil === 'ADM') {
      return '/admin/dashboard';
    } else if (perfil === 'PROFESSOR') {
      return '/professor/dashboard';
    } else if (perfil === 'ALUNO') {
      return '/aluno/dashboard';
    }
    return '/login';
  }
}


