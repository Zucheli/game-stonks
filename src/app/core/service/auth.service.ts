import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Envs
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.baseUrlApi}`;

  public token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  login(login: any): Observable<any> {
    const body = new HttpParams()
      .set('username', login.username)
      .set('password', login.password)
      .set('grant_type', 'password');

    return this.http.post(`${this.baseURL}/oauth/token`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic ' + btoa('stonks:stonks123456')),
    });
  }

  getListJobs(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/teams/vacancies`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  }

  getTeam(teamId: any): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/teams/${teamId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  }

  applyVacancy(infos: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/players/${infos.vacancyId}/teams/${infos.teamId}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  }
}
