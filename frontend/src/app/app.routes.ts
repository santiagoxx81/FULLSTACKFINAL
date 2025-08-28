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
import { authGuard } from './guards/auth-guard';
import { AdminVinculosComponent } from './pages/admin/vinculos/admin-vinculos/admin-vinculos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ADMIN somente logado e com perfil ADMIN
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { roles: ['ADM'] } },
  { path: 'admin/users',      component: UserListComponent,     canActivate: [authGuard], data: { roles: ['ADM'] } },
  { path: 'admin/alunos',     component: AlunoListComponent,    canActivate: [authGuard], data: { roles: ['ADM'] } },
  { path: 'admin/turmas',     component: TurmaListComponent,    canActivate: [authGuard], data: { roles: ['ADM'] } },
  { path: 'admin/disciplinas',component: DisciplinaListComponent,canActivate: [authGuard], data: { roles: ['ADM'] } },
  { path: 'admin/vinculos', component: AdminVinculosComponent, canActivate: [authGuard], data: { roles: ['ADM'] } },

  // PROFESSOR
  { path: 'professor/dashboard', component: ProfessorDashboardComponent, canActivate: [authGuard], data: { roles: ['PROFESSOR'] } },
  { path: 'professor/turma/:id', component: TurmaDetailComponent,         canActivate: [authGuard], data: { roles: ['PROFESSOR'] } },

  // ALUNO
  { path: 'aluno/dashboard', component: AlunoDashboardComponent, canActivate: [authGuard], data: { roles: ['ALUNO'] } },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];