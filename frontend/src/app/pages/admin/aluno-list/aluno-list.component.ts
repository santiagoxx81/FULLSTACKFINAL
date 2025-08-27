import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../../services/aluno.service';
import { UserService } from '../../../services/user.service'; // Para associar aluno a um usuário existente

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aluno-list.component.html',
  styleUrl: './aluno-list.component.css'
})
export class AlunoListComponent implements OnInit {
  alunos: any[] = [];
  users: any[] = []; // Para a lista de usuários a serem associados
  errorMessage: string = '';
  successMessage: string = '';

  // Para o formulário de criação/edição
  newAluno: any = { nome: '', matricula: '', email: '', telefone: '', usuario_id: null };
  isEditing: boolean = false;
  selectedAlunoId: number | null = null;

  constructor(private alunoService: AlunoService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadAlunos();
    this.loadUsers();
  }

  loadAlunos(): void {
    this.alunoService.getAllAlunos().subscribe({
      next: (data) => {
        this.alunos = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao carregar alunos.';
        console.error('Erro ao carregar alunos:', err);
      }
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        // Filtra apenas usuários que ainda não estão associados a um aluno
        this.users = data.filter((user: any) => !this.alunos.some(aluno => aluno.usuario_id === user.id));
      },
      error: (err) => {
        console.error('Erro ao carregar usuários para associação:', err);
      }
    });
  }

  createAluno(): void {
    this.alunoService.createAluno(this.newAluno).subscribe({
      next: () => {
        this.successMessage = 'Aluno criado com sucesso!';
        this.resetForm();
        this.loadAlunos();
        this.loadUsers(); // Recarrega usuários para atualizar a lista de disponíveis
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao criar aluno.';
        console.error('Erro ao criar aluno:', err);
      }
    });
  }

  editAluno(aluno: any): void {
    this.isEditing = true;
    this.selectedAlunoId = aluno.id;
    this.newAluno = { ...aluno }; // Copia os dados do aluno para o formulário
    // Adiciona o usuário atual do aluno à lista de usuários disponíveis para edição
    if (aluno.usuario_id && !this.users.some(user => user.id === aluno.usuario_id)) {
      this.userService.getUserById(aluno.usuario_id).subscribe(user => {
        this.users.push(user);
      });
    }
  }

  updateAluno(): void {
    if (this.selectedAlunoId) {
      this.alunoService.updateAluno(this.selectedAlunoId, this.newAluno).subscribe({
        next: () => {
          this.successMessage = 'Aluno atualizado com sucesso!';
          this.resetForm();
          this.loadAlunos();
          this.loadUsers();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao atualizar aluno.';
          console.error('Erro ao atualizar aluno:', err);
        }
      });
    }
  }

  deleteAluno(alunoId: number): void {
    if (confirm('Tem certeza que deseja deletar este aluno?')) {
      this.alunoService.deleteAluno(alunoId).subscribe({
        next: () => {
          this.successMessage = 'Aluno deletado com sucesso!';
          this.loadAlunos();
          this.loadUsers();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao deletar aluno.';
          console.error('Erro ao deletar aluno:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.newAluno = { nome: '', matricula: '', email: '', telefone: '', usuario_id: null };
    this.isEditing = false;
    this.selectedAlunoId = null;
    this.errorMessage = '';
    this.successMessage = '';
  }
}


