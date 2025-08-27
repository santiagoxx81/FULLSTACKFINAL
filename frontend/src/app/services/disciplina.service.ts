import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'x-access-token': token || ''
    });
  }

  createDisciplina(disciplinaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/disciplinas`, disciplinaData, { headers: this.getHeaders() });
  }

  getAllDisciplinas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/disciplinas`, { headers: this.getHeaders() });
  }

  getDisciplinaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/disciplinas/${id}`, { headers: this.getHeaders() });
  }

  updateDisciplina(id: number, disciplinaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/disciplinas/${id}`, disciplinaData, { headers: this.getHeaders() });
  }

  deleteDisciplina(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/disciplinas/${id}`, { headers: this.getHeaders() });
  }

  addDisciplinaToTurma(turmaId: number, disciplinaId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/disciplinas/add-turma`, { turma_id: turmaId, disciplina_id: disciplinaId }, { headers: this.getHeaders() });
  }

  removeDisciplinaFromTurma(turmaId: number, disciplinaId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/disciplinas/remove-turma`, { turma_id: turmaId, disciplina_id: disciplinaId }, { headers: this.getHeaders() });
  }

  getDisciplinasByTurma(turmaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/disciplinas/${turmaId}/turmas`, { headers: this.getHeaders() });
  }
}


