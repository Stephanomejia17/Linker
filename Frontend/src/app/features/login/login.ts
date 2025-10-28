import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alerts } from '../../shared/services/alerts';
import { Auth } from '../../shared/services/auth';
import { Perfil } from '../../shared/services/perfil';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  alert = inject(Alerts);
  auth = inject(Auth);
  fb = inject(FormBuilder);
  router = inject(Router);
  profile = inject(Perfil);

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

onLogin() {
  const user = this.loginForm.value as User;

  this.auth.login(user).subscribe({
    next: (response) => {
      if (response.success) {
        this.alert.success(response.message);
        this.auth.isLogged.set(true);

        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', response.user.id);

        const id = response.user.id;
        console.log('ID de usuario en sesión:', id);

        
        this.profile.getIsEmpresa(id).subscribe({
          next: (isEmpresa: any) => {
            sessionStorage.setItem('isEmpresa', isEmpresa);

            this.auth.getPerfilId(id).subscribe({
              next: (perfilData: any) => {
                console.log('desde login perfil', perfilData.id);
                sessionStorage.setItem('perfilId', perfilData.id);

                this.router.navigate(['match']);
              },
              error: (err) => console.error('Error al obtener el perfil:', err),
            });
          },
          error: (err) => console.error('Error al obtener tipo de usuario:', err),
        });
      } else {
        this.alert.error(response.message);
      }
    },
    error: (error) => {
      console.error(error);
      this.alert.error('Error en la solicitud');
    },
  });
}

}
