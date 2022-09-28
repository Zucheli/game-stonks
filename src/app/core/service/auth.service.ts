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

  constructor(private http: HttpClient) {}

  getListJobs(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/teams/vacancies`);
  }

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
    // return this.http.post<any>(`${this.baseURL}/oauth/token`, login);
  }

  // loginUser(email: string): Observable<any> {
  //   return this.http.post<any>(`${this.baseURL}/login?email=${email}`, email);
  // }

  // saveUser(user: object): Observable<any> {
  //   return this.http.post<any>(`${this.baseURL}/usuarios`, user);
  // }

  // sendMessage(message: object): Observable<any> {
  //   return this.http.post<any>(`${this.baseURL}/questoes`, message);
  // }

  // getQuestion(password: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseURL}/questoes?password=${password}`);
  // }
}
