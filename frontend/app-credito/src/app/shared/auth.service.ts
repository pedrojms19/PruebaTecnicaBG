import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = 'https://localhost:7081/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: {
    nombres: string;
    email: string;
    password: string;
    rol: 'Solicitante';
  }) {
    return this.http.post(`${this.urlApi}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ token: string}>(`${this.urlApi}/login`, data)
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
