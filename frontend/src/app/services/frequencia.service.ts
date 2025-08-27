import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'x-access-token': token || ''
    });
  }

  createFrequencia(frequenciaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/frequencia`, frequenciaData, { headers: this.getHeaders() });
  }

  getAllFrequencias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/frequencia`, { headers: this.getHeaders() });
  }

  getFrequenciaByAluno(alunoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/frequencia/aluno/${alunoId}`, { headers: this.getHeaders() });
  }

  updateFrequencia(id: number, frequenciaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/frequencia/${id}`, frequenciaData, { headers: this.getHeaders() });
  }

  deleteFrequencia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/frequencia/${id}`, { headers: this.getHeaders() });
  }
}


