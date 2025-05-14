import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { TokenService } from '../../shared/token.service';
import { NgIf } from '@angular/common';
import { VersolicitudesComponent } from '../solicitante/ver-solicitudes/ver-solicitudes.component';
import { ListaSolicitudesComponent } from "../analista/lista-solicitudes/lista-solicitudes.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [NgIf, VersolicitudesComponent, ListaSolicitudesComponent]
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userRole = this.tokenService.getUserRole();
    console.log(this.userRole)
  }

  logout(): void {
    this.authService.logout();
  }
}