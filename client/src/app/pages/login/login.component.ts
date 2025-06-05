import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
private userService = inject(UsersService);
private authService = inject(AuthService);
private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

onSubmit() {
   
    if (this.loginForm.valid) {
      this.userService
        .login(this.loginForm.value as { email: string; password: string })
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.authService.setToken(response.token);
            // localStorage.setItem('token', response.token);
            Swal.fire('Se ha Logeado','','success')
            this.router.navigate(['/products']);
          },
          error: (error: any) => {
            Swal.fire('No se pudo Logear',error.error.error,'error')
            console.error(error);
          },
        });
    }
  }


}
