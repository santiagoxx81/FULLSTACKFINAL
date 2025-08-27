import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'x-access-token': token || ''
    });
  }

  createNota(notaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notas`, notaData, { headers: this.getHeaders() });
  }

  getAllNotas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notas`, { headers: this.getHeaders() });
  }

  getNotasByAluno(alunoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/notas/aluno/${alunoId}`, { headers: this.getHeaders() });
  }

  updateNota(id: number, notaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/notas/${id}`, notaData, { headers: this.getHeaders() });
  }

  deleteNota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notas/${id}`, { headers: this.getHeaders() });
  }
}


