import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'x-access-token': token || ''
    });
  }

  createProfessor(professorData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/professores`, professorData, { headers: this.getHeaders() });
  }

  getAllProfessores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/professores`, { headers: this.getHeaders() });
  }

  getProfessorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/professores/${id}`, { headers: this.getHeaders() });
  }

  updateProfessor(id: number, professorData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/professores/${id}`, professorData, { headers: this.getHeaders() });
  }

  deleteProfessor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/professores/${id}`, { headers: this.getHeaders() });
  }
}


