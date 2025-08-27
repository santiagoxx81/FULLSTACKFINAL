import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent as AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { AlunoListComponent } from './pages/admin/aluno-list/aluno-list.component';
import { TurmaListComponent } from './pages/admin/turma-list/turma-list.component';
import { DisciplinaListComponent } from './pages/admin/disciplina-list/disciplina-list.component';
import { DashboardComponent as ProfessorDashboardComponent } from './pages/professor/dashboard/dashboard.component';
import { TurmaDetailComponent } from './pages/professor/turma-detail/turma-detail.component';
import { DashboardComponent as AlunoDashboardComponent } from './pages/aluno/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/users', component: UserListComponent },
  { path: 'admin/alunos', component: AlunoListComponent },
  { path: 'admin/turmas', component: TurmaListComponent },
  { path: 'admin/disciplinas', component: DisciplinaListComponent },
  { path: 'professor/dashboard', component: ProfessorDashboardComponent },
  { path: 'professor/turma/:id', component: TurmaDetailComponent },
  { path: 'aluno/dashboard', component: AlunoDashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } // Redireciona para login em caso de rota não encontrada
];
