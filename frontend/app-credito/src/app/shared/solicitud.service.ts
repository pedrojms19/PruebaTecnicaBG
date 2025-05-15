import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Solicitud } from './models/solicitud.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'https://localhost:7081/Solicitud';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  obtenerSolicitudes(): Observable<Solicitud[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.get<Solicitud[]>(this.apiUrl + '/getAllLoans', {
      headers,
    });
  }

  crearSolicitud(data: FormGroup){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.post<void>(`${this.apiUrl}/createloan`, data, {headers});
  }

  actualizarEstado(id: string, nuevoEstado: string): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    const params = new HttpParams().set('newStatus', nuevoEstado);

    return this.http.put<void>(
      `${this.apiUrl}/${id.toUpperCase()}/status`,
      null,
      {
        headers,
        params,
      }
    );
  }

  getSolicitudPorUserId() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );

    return this.http.get<Solicitud[]>(this.apiUrl + '/getLoansByUserId', {
      headers,
    });
  }
}
