import { Component, inject, } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  email:['',[Validators.required, Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]],
  repassword:['',[Validators.required]],
},{validators: passwordValidator('password','repassword')})

  postulanteForm=this.fb.group({
    name:['',Validators.required],
    lastname:['',Validators.required],});


  nextStep(): void {
    const nameControl = this.postulanteForm.get('name');
    const lastnameControl = this.postulanteForm.get('lastname');

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
    let postulante= this.postulanteForm.value as PerfilPostulanteModel;

    if(this.signupForm.hasError('passwordMismatch')){
      this.alert.error("Las contraseñas no coinciden");
      return
    }

    if(this.signupForm.invalid || this.postulanteForm.invalid){
      this.alert.error('Campos incorrectos');
      return 
    }

    this.auth.signUp(user).subscribe({
      next:(response)=>{
        if(response.success){
          postulante.idUser=response.user.id;

          this.auth.signUpPostulante(postulante).subscribe({
            next:(postresponse)=>{
              if(postresponse){
                this.alert.success('Registro exitoso. Por favor, inicie sesión.');
                this.router.navigate(['login']);
              }}
          })
        }
        else{
          this.alert.error(response.message);
        }
    },error:(error)=>{
        console.error(error);
        this.alert.error('Error en la solicitud');
      },
  });

  }

}