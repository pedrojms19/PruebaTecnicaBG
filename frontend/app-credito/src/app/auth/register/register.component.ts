import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  Validators, ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombres: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['Solicitante']
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: () => {
          alert('Registrado correctamente');
          this.router.navigate(['/']);
        },
        error: () => alert('Registro fallido'),
      });
    }
  }
}
