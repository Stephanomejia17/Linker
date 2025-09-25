import { Component, inject, Injector } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../shared/services/auth';
import { Alerts } from '../../shared/services/alerts';

@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  alert=inject(Alerts);
  auth= inject(Auth);
  fb=inject(FormBuilder);
  router=inject(Router);

  signupForm=this.fb.group({
    name:['',Validators.required],
    lastname:['',Validators.required],
    email:['',Validators.required, Validators.email],
    password:['',Validators.required],
    repassword:['',Validators.required]
  })

  OnSignUp(){
    let user= this.signupForm.value as User;

    if(this.signupForm.invalid){
      this.alert.error('Campos incorrectos');
      console.log("no valido");
      return 
    }

    let response= this.auth.signUp(user)
    
    if(!!response.succes){
      this.alert.success(response.message);
      this.router.navigate(['/login'])
    }
    else{
    this.alert.error(response.message)
    }
  }
}
