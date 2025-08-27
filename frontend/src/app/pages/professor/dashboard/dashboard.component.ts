import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TurmaService } from '../../../services/turma.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  turmas: any[] = [];
  errorMessage: string = '';
  currentUserId: number | null = null;

  constructor(private turmaService: TurmaService, private authService: AuthService) { }

  ngOnInit(): void {
    // Ideally, the professor's ID would be retrieved from the authenticated user token
    // For now, we'll load all turmas and filter on the frontend, or assume a specific professor_id for testing
    // In a real application, the backend would filter turmas by professor_id based on the token
    this.loadTurmas();
  }

  loadTurmas(): void {
    this.turmaService.getAllTurmas().subscribe({
      next: (data) => {
        // In a real scenario, filter by professor_id from authService.getUserId()
        this.turmas = data; // For now, show all turmas
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao carregar turmas.';
        console.error('Erro ao carregar turmas:', err);
      }
    });
  }
}


