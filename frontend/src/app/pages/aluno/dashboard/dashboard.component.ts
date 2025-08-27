import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaService } from '../../../services/nota.service';
import { FrequenciaService } from '../../../services/frequencia.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  notas: any[] = [];
  frequencia: any[] = [];
  errorMessage: string = '';
  alunoId: number | null = null;

  constructor(
    private notaService: NotaService,
    private frequenciaService: FrequenciaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      // Em um cenário real, você buscaria o aluno_id associado a este userId no backend.
      // Por simplicidade, e para fins de demonstração, vamos assumir que o userId é o alunoId.
      // **IMPORTANTE:** Em uma aplicação real, você teria uma rota no backend para obter o aluno_id
      // com base no usuario_id do token, ou o aluno_id viria diretamente no token.
      this.alunoId = userId;
      this.loadNotas(this.alunoId);
      this.loadFrequencia(this.alunoId);
    } else {
      this.errorMessage = 'ID do aluno não encontrado. Faça login como aluno.';
    }
  }

  loadNotas(alunoId: number): void {
    this.notaService.getNotasByAluno(alunoId).subscribe({
      next: (data) => {
        this.notas = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao carregar notas.';
        console.error('Erro ao carregar notas:', err);
      }
    });
  }

  loadFrequencia(alunoId: number): void {
    this.frequenciaService.getFrequenciaByAluno(alunoId).subscribe({
      next: (data) => {
        this.frequencia = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao carregar frequência.';
        console.error('Erro ao carregar frequência:', err);
      }
    });
  }
}


