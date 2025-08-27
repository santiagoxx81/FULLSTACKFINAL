import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisciplinaService } from '../../../services/disciplina.service';
import { TurmaService } from '../../../services/turma.service';

@Component({
  selector: 'app-disciplina-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './disciplina-list.component.html',
  styleUrl: './disciplina-list.component.css'
})
export class DisciplinaListComponent implements OnInit {
  disciplinas: any[] = [];
  turmas: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  newDisciplina: any = { nome: '', carga_horaria: null };
  isEditing: boolean = false;
  selectedDisciplinaId: number | null = null;

  // Para associar disciplinas a turmas
  selectedTurmaToAssociate: number | null = null;
  turmasAssociadas: any[] = [];

  constructor(
    private disciplinaService: DisciplinaService,
    private turmaService: TurmaService
  ) { }

  ngOnInit(): void {
    this.loadDisciplinas();
    this.loadTurmas();
  }

  loadDisciplinas(): void {
    this.disciplinaService.getAllDisciplinas().subscribe({
      next: (data) => {
        this.disciplinas = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao carregar disciplinas.';
        console.error('Erro ao carregar disciplinas:', err);
      }
    });
  }

  loadTurmas(): void {
    this.turmaService.getAllTurmas().subscribe({
      next: (data) => {
        this.turmas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar turmas:', err);
      }
    });
  }

  createDisciplina(): void {
    this.disciplinaService.createDisciplina(this.newDisciplina).subscribe({
      next: () => {
        this.successMessage = 'Disciplina criada com sucesso!';
        this.resetForm();
        this.loadDisciplinas();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao criar disciplina.';
        console.error('Erro ao criar disciplina:', err);
      }
    });
  }

  editDisciplina(disciplina: any): void {
    this.isEditing = true;
    this.selectedDisciplinaId = disciplina.id;
    this.newDisciplina = { ...disciplina };
    this.loadTurmasAssociadas(disciplina.id);
  }

  updateDisciplina(): void {
    if (this.selectedDisciplinaId) {
      this.disciplinaService.updateDisciplina(this.selectedDisciplinaId, this.newDisciplina).subscribe({
        next: () => {
          this.successMessage = 'Disciplina atualizada com sucesso!';
          this.resetForm();
          this.loadDisciplinas();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao atualizar disciplina.';
          console.error('Erro ao atualizar disciplina:', err);
        }
      });
    }
  }

  deleteDisciplina(disciplinaId: number): void {
    if (confirm('Tem certeza que deseja deletar esta disciplina?')) {
      this.disciplinaService.deleteDisciplina(disciplinaId).subscribe({
        next: () => {
          this.successMessage = 'Disciplina deletada com sucesso!';
          this.loadDisciplinas();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao deletar disciplina.';
          console.error('Erro ao deletar disciplina:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.newDisciplina = { nome: '', carga_horaria: null };
    this.isEditing = false;
    this.selectedDisciplinaId = null;
    this.errorMessage = '';
    this.successMessage = '';
    this.turmasAssociadas = [];
    this.selectedTurmaToAssociate = null;
  }

  loadTurmasAssociadas(disciplinaId: number): void {
    this.disciplinaService.getDisciplinasByTurma(disciplinaId).subscribe({
      next: (data) => {
        this.turmasAssociadas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar turmas associadas:', err);
      }
    });
  }

  addDisciplinaToTurma(): void {
    if (this.selectedDisciplinaId && this.selectedTurmaToAssociate) {
      this.disciplinaService.addDisciplinaToTurma(this.selectedTurmaToAssociate, this.selectedDisciplinaId).subscribe({
        next: () => {
          this.successMessage = 'Disciplina associada à turma com sucesso!';
          this.loadTurmasAssociadas(this.selectedDisciplinaId!); // Recarrega turmas associadas
          this.selectedTurmaToAssociate = null;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao associar disciplina à turma.';
          console.error('Erro ao associar disciplina à turma:', err);
        }
      });
    }
  }

  removeDisciplinaFromTurma(turmaId: number): void {
    if (this.selectedDisciplinaId && confirm('Tem certeza que deseja remover esta disciplina desta turma?')) {
      this.disciplinaService.removeDisciplinaFromTurma(turmaId, this.selectedDisciplinaId).subscribe({
        next: () => {
          this.successMessage = 'Disciplina removida da turma!';
          this.loadTurmasAssociadas(this.selectedDisciplinaId!); // Recarrega turmas associadas
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao remover disciplina da turma.';
          console.error('Erro ao remover disciplina da turma:', err);
        }
      });
    }
  }
}


