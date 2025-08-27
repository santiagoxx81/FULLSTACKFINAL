import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao carregar usuários.';
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }

  toggleUserStatus(userId: number, currentStatus: boolean): void {
    this.userService.toggleUserStatus(userId, !currentStatus).subscribe({
      next: () => {
        this.loadUsers(); // Recarrega a lista para refletir a mudança
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao alterar status do usuário.';
        console.error('Erro ao alterar status do usuário:', err);
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers(); // Recarrega a lista para refletir a exclusão
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao deletar usuário.';
          console.error('Erro ao deletar usuário:', err);
        }
      });
    }
  }
}


