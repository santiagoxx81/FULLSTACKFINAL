import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TurmaService } from '../../../services/turma.service';
import { AlunoService } from '../../../services/aluno.service';
import { NotaService } from '../../../services/nota.service';
import { FrequenciaService } from '../../../services/frequencia.service';
import { DisciplinaService } from '../../../services/disciplina.service';

@Component({
  selector: 'app-turma-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turma-detail.component.html',
  styleUrl: './turma-detail.component.css'
})
export class TurmaDetailComponent implements OnInit {
  turmaId: number | null = null;
  turma: any = {};
  alunosNaTurma: any[] = [];
  disciplinasDaTurma: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  // Para notas
  newNota: any = { aluno_id: null, disciplina_id: null, turma_id: null, nota: null };
  notasDoAluno: any[] = [];

  // Para frequência
  newFrequencia: any = { aluno_id: null, disciplina_id: null, turma_id: null, data_aula: '', presente: true };
  frequenciaDoAluno: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private notaService: NotaService,
    private frequenciaService: FrequenciaService,
    private disciplinaService: DisciplinaService
  ) { }

  ngOnInit(): void {
    this.turmaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.turmaId) {
      this.loadTurmaDetails();
      this.loadAlunosNaTurma(this.turmaId);
      this.loadDisciplinasDaTurma(this.turmaId);
    }
  }

  loadTurmaDetails(): void {
    if (this.turmaId) {
      this.turmaService.getTurmaById(this.turmaId).subscribe({
        next: (data) => {
          this.turma = data;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao carregar detalhes da turma.';
          console.error('Erro ao carregar detalhes da turma:', err);
        }
      });
    }
  }

  loadAlunosNaTurma(turmaId: number): void {
    this.turmaService.getAlunosByTurma(turmaId).subscribe({
      next: (data) => {
        this.alunosNaTurma = data;
      },
      error: (err) => {
        console.error('Erro ao carregar alunos da turma:', err);
      }
    });
  }

  loadDisciplinasDaTurma(turmaId: number): void {
    this.disciplinaService.getDisciplinasByTurma(turmaId).subscribe({
      next: (data) => {
        this.disciplinasDaTurma = data;
      },
      error: (err) => {
        console.error('Erro ao carregar disciplinas da turma:', err);
      }
    });
  }

  // Métodos para Notas
  loadNotasDoAluno(alunoId: number): void {
    this.notaService.getNotasByAluno(alunoId).subscribe({
      next: (data) => {
        this.notasDoAluno = data;
      },
      error: (err) => {
        console.error('Erro ao carregar notas do aluno:', err);
      }
    });
  }

  createNota(): void {
    if (this.turmaId) {
      this.newNota.turma_id = this.turmaId;
      this.notaService.createNota(this.newNota).subscribe({
        next: () => {
          this.successMessage = 'Nota lançada com sucesso!';
          this.loadNotasDoAluno(this.newNota.aluno_id);
          this.resetNotaForm();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao lançar nota.';
          console.error('Erro ao lançar nota:', err);
        }
      });
    }
  }

  deleteNota(notaId: number, alunoId: number): void {
    if (confirm('Tem certeza que deseja deletar esta nota?')) {
      this.notaService.deleteNota(notaId).subscribe({
        next: () => {
          this.successMessage = 'Nota deletada com sucesso!';
          this.loadNotasDoAluno(alunoId);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao deletar nota.';
          console.error('Erro ao deletar nota:', err);
        }
      });
    }
  }

  resetNotaForm(): void {
    this.newNota = { aluno_id: null, disciplina_id: null, turma_id: null, nota: null };
  }

  // Métodos para Frequência
  loadFrequenciaDoAluno(alunoId: number): void {
    this.frequenciaService.getFrequenciaByAluno(alunoId).subscribe({
      next: (data) => {
        this.frequenciaDoAluno = data;
      },
      error: (err) => {
        console.error('Erro ao carregar frequência do aluno:', err);
      }
    });
  }

  createFrequencia(): void {
    if (this.turmaId) {
      this.newFrequencia.turma_id = this.turmaId;
      this.frequenciaService.createFrequencia(this.newFrequencia).subscribe({
        next: () => {
          this.successMessage = 'Frequência registrada com sucesso!';
          this.loadFrequenciaDoAluno(this.newFrequencia.aluno_id);
          this.resetFrequenciaForm();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao registrar frequência.';
          console.error('Erro ao registrar frequência:', err);
        }
      });
    }
  }

  deleteFrequencia(frequenciaId: number, alunoId: number): void {
    if (confirm('Tem certeza que deseja deletar este registro de frequência?')) {
      this.frequenciaService.deleteFrequencia(frequenciaId).subscribe({
        next: () => {
          this.successMessage = 'Registro de frequência deletado com sucesso!';
          this.loadFrequenciaDoAluno(alunoId);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao deletar registro de frequência.';
          console.error('Erro ao deletar registro de frequência:', err);
        }
      });
    }
  }

  resetFrequenciaForm(): void {
    this.newFrequencia = { aluno_id: null, disciplina_id: null, turma_id: null, data_aula: '', presente: true };
  }
}


