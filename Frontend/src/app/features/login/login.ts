import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Alerts } from '../../shared/services/alerts';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  alert=inject(Alerts);
  auth= inject(Auth);
  fb=inject(FormBuilder);
  router=inject(Router);

  loginForm=this.fb.group({
    email:['',[Validators.email, Validators.required]],
    password:['',[Validators.required]]
  })

  onLogin(){
    let user = this.loginForm.value as User|Empresa ;

    let response = this.auth.login(user);

    if (response.success) {
      this.alert.success(response.message);
    }else{
    this.alert.error(response.message);
  }
}


}
