import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'x-access-token': token || ''
    });
  }

  createTurma(turmaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/turmas`, turmaData, { headers: this.getHeaders() });
  }

  getAllTurmas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/turmas`, { headers: this.getHeaders() });
  }

  getTurmaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/turmas/${id}`, { headers: this.getHeaders() });
  }

  updateTurma(id: number, turmaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/turmas/${id}`, turmaData, { headers: this.getHeaders() });
  }

  deleteTurma(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/turmas/${id}`, { headers: this.getHeaders() });
  }

  addAlunoToTurma(turmaId: number, alunoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/turmas/add-aluno`, { turma_id: turmaId, aluno_id: alunoId }, { headers: this.getHeaders() });
  }

  removeAlunoFromTurma(turmaId: number, alunoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/turmas/remove-aluno`, { turma_id: turmaId, aluno_id: alunoId }, { headers: this.getHeaders() });
  }

  getAlunosByTurma(turmaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/turmas/${turmaId}/alunos`, { headers: this.getHeaders() });
  }
}


