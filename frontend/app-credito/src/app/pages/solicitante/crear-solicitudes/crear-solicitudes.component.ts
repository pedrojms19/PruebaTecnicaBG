import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SolicitudService } from '../../../shared/solicitud.service';


@Component({
  selector: 'app-crear-solicitudes',
  imports: [ReactiveFormsModule, MatDialogModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './crear-solicitudes.component.html',
  styleUrl: './crear-solicitudes.component.css'
})
export class CrearSolicitudesComponent {
  error: string | null = "";
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [null, [Validators.required]],
      termMonths: [null, [Validators.required]],
      monthlyIncome: [null, [Validators.required]],
      workSeniorityYears: [null, [Validators.required]]
    });
  }

  crearSolicitud(){
    if (this.form.valid) {
      this.solicitudService.crearSolicitud(this.form.value).subscribe(() => {
        alert('Solicitud creada correctamente');
        this.close()
      });
    }
    else{
      this.error = "No se pudo enviar la solicitud."      
    }
  }

  close(): void{
    this.router.navigate(['/home'])
  }

}
