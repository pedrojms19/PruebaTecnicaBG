import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { CrearSolicitudesComponent } from './pages/solicitante/crear-solicitudes/crear-solicitudes.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  { path: 'home',
    component: HomeComponent, canActivate: [AuthGuard], children: [{
      path: 'crear-solicitud', component: CrearSolicitudesComponent
    }]
  }
];
