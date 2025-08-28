import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// ajuste a URL base conforme seu backend
const BASE = 'http://localhost:3000/admin';

export interface TurmaDTO { id: number; nome: string; periodo: string; professor?: string; }
export interface AlunoDTO { id: number; nome: string; matricula: string; }
export interface VinculoDTO { aluno_id: number; aluno_nome: string; matricula: string; }

@Injectable({ providedIn: 'root' })
export class VinculosService {
  constructor(private http: HttpClient) {}

  listarTurmas(): Observable<TurmaDTO[]> {
    return this.http.get<TurmaDTO[]>(`${BASE}/turmas`);
  }

  listarAlunos(): Observable<AlunoDTO[]> {
    return this.http.get<AlunoDTO[]>(`${BASE}/alunos`);
  }

  listarVinculos(turmaId: number): Observable<VinculoDTO[]> {
    const params = new HttpParams().set('turmaId', turmaId);
    return this.http.get<VinculoDTO[]>(`${BASE}/vinculos`, { params });
  }

  vincularPorAlunoId(turmaId: number, alunoId: number) {
    return this.http.post(`${BASE}/turmas/${turmaId}/alunos`, { alunoId });
  }

  vincularPorMatricula(turmaId: number, matricula: string) {
    return this.http.post(`${BASE}/turmas/${turmaId}/alunos`, { matricula });
  }

  remover(turmaId: number, alunoId: number) {
    return this.http.delete(`${BASE}/turmas/${turmaId}/alunos/${alunoId}`);
  }
}
