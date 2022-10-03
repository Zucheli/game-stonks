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

  ngOnInit(): void {}

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

  getListPlayers(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/teams/playersOpenToWork`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  }

  getListRooms(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/training-rooms`, {
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
      `${this.baseURL}/players/${infos.vacancyId}/teams/${infos.teamId}/games/${infos.gameId}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  }

  applyRoom(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/training-rooms/${id}/request`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  }

  getUserInformation(): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/players/findAuthUserInformation`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  }

  creatAccount(account: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/players/create`, account);
  }

  updateAccount(request: any): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/players/update`, request, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  }

  invitePlayer(playerId: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/teams/invitePlayer/${playerId}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  }

  createRoom(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/training-rooms`, request, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  }
}
