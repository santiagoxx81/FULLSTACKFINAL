import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurmaService } from '../../../services/turma.service';
import { ProfessorService } from '../../../services/professor.service';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turma-list.component.html',
  styleUrl: './turma-list.component.css'
})
export class TurmaListComponent implements OnInit {
  turmas: any[] = [];
  professores: any[] = [];
  alunosDisponiveis: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  newTurma: any = { nome: '', periodo: '', professor_id: null };
  isEditing: boolean = false;
  selectedTurmaId: number | null = null;

  // Para adicionar/remover alunos da turma
  selectedAlunoToAdd: number | null = null;
  alunosNaTurma: any[] = [];

  constructor(
    private turmaService: TurmaService,
    private professorService: ProfessorService,
    private alunoService: AlunoService
  ) { }

  ngOnInit(): void {
    this.loadTurmas();
    this.loadProfessores();
    this.loadAlunosDisponiveis();
  }

  loadTurmas(): void {
    this.turmaService.getAllTurmas().subscribe({
      next: (data) => {
        this.turmas = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao carregar turmas.';
        console.error('Erro ao carregar turmas:', err);
      }
    });
  }

  loadProfessores(): void {
    this.professorService.getAllProfessores().subscribe({
      next: (data) => {
        this.professores = data;
      },
      error: (err) => {
        console.error('Erro ao carregar professores:', err);
      }
    });
  }

  loadAlunosDisponiveis(): void {
    this.alunoService.getAllAlunos().subscribe({
      next: (data) => {
        this.alunosDisponiveis = data;
      },
      error: (err) => {
        console.error('Erro ao carregar alunos disponíveis:', err);
      }
    });
  }

  createTurma(): void {
    this.turmaService.createTurma(this.newTurma).subscribe({
      next: () => {
        this.successMessage = 'Turma criada com sucesso!';
        this.resetForm();
        this.loadTurmas();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao criar turma.';
        console.error('Erro ao criar turma:', err);
      }
    });
  }

  editTurma(turma: any): void {
    this.isEditing = true;
    this.selectedTurmaId = turma.id;
    this.newTurma = { ...turma };
    this.loadAlunosNaTurma(turma.id);
  }

  updateTurma(): void {
    if (this.selectedTurmaId) {
      this.turmaService.updateTurma(this.selectedTurmaId, this.newTurma).subscribe({
        next: () => {
          this.successMessage = 'Turma atualizada com sucesso!';
          this.resetForm();
          this.loadTurmas();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao atualizar turma.';
          console.error('Erro ao atualizar turma:', err);
        }
      });
    }
  }

  deleteTurma(turmaId: number): void {
    if (confirm('Tem certeza que deseja deletar esta turma?')) {
      this.turmaService.deleteTurma(turmaId).subscribe({
        next: () => {
          this.successMessage = 'Turma deletada com sucesso!';
          this.loadTurmas();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao deletar turma.';
          console.error('Erro ao deletar turma:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.newTurma = { nome: '', periodo: '', professor_id: null };
    this.isEditing = false;
    this.selectedTurmaId = null;
    this.errorMessage = '';
    this.successMessage = '';
    this.alunosNaTurma = [];
    this.selectedAlunoToAdd = null;
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

  addAlunoToTurma(): void {
    if (this.selectedTurmaId && this.selectedAlunoToAdd) {
      this.turmaService.addAlunoToTurma(this.selectedTurmaId, this.selectedAlunoToAdd).subscribe({
        next: () => {
          this.successMessage = 'Aluno adicionado à turma!';
          this.loadAlunosNaTurma(this.selectedTurmaId!); // Recarrega alunos da turma
          this.selectedAlunoToAdd = null;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao adicionar aluno à turma.';
          console.error('Erro ao adicionar aluno à turma:', err);
        }
      });
    }
  }

  removeAlunoFromTurma(alunoId: number): void {
    if (this.selectedTurmaId && confirm('Tem certeza que deseja remover este aluno da turma?')) {
      this.turmaService.removeAlunoFromTurma(this.selectedTurmaId, alunoId).subscribe({
        next: () => {
          this.successMessage = 'Aluno removido da turma!';
          this.loadAlunosNaTurma(this.selectedTurmaId!); // Recarrega alunos da turma
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao remover aluno da turma.';
          console.error('Erro ao remover aluno da turma:', err);
        }
      });
    }
  }
}


