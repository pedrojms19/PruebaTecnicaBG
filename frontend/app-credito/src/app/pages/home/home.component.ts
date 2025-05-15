import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { TokenService } from '../../shared/token.service';
import { NgIf } from '@angular/common';
import { VersolicitudesComponent } from '../solicitante/ver-solicitudes/ver-solicitudes.component';
import { ListaSolicitudesComponent } from "../analista/lista-solicitudes/lista-solicitudes.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [NgIf, VersolicitudesComponent, ListaSolicitudesComponent, RouterOutlet, RouterLink]
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userRole = this.tokenService.getUserRole();
    console.log(this.userRole)
    console.log(this.authService.getToken())
  }

  logout(): void {
    this.authService.logout();
  }
}