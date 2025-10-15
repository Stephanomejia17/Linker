import { Component, inject, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../shared/services/auth';
import { Alerts } from '../../shared/services/alerts';
import { passwordValidator } from '../../validators/password-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule], 
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})

export class Signup{

  alert=inject(Alerts);
  auth= inject(Auth);
  fb=inject(FormBuilder);
  router=inject(Router);
  currentStep: number = 1;

  signupForm=this.fb.group({
  name:['',Validators.required],
  lastname:['',Validators.required],
  email:['',[Validators.required, Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]],
  repassword:['',[Validators.required]],
  perfil:{}
},{validators: passwordValidator('password','repassword')})


  nextStep(): void {
    const nameControl = this.signupForm.get('name');
    const lastnameControl = this.signupForm.get('lastname');
    
    if (nameControl?.valid && lastnameControl?.valid) {
      this.currentStep = 2;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSignUp(){
    let user= this.signupForm.value as User;

    if(this.signupForm.hasError('passwordMismatch')){
      this.alert.error("Las contraseñas no coinciden");
      return
    }

    if(this.signupForm.invalid){
      this.alert.error('Campos incorrectos');
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