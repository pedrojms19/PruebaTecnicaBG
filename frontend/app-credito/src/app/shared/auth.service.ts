import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi= '' 

  constructor() { }

  login(email: string, password: string)
}
