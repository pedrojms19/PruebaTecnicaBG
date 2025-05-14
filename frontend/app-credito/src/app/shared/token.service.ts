import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  getUserRole(): string | null {
    const token = this.getDecodedToken();
    return token?.Rol || null;
  }
}