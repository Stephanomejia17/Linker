import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Alerts } from '../../shared/services/alerts';
import { Auth } from '../../shared/services/auth';
import { passwordValidator } from '../../validators/password-validator';

@Component({
  selector: 'app-signup-empresas',
  standalone:true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup-empresas.html',
  styleUrl: './signup-empresas.css'
})
export class SignupEmpresas {

  alert=inject(Alerts);
  auth= inject(Auth);
  fb=inject(FormBuilder);
  router=inject(Router);

  signupEmpresasForm=this.fb.group({
    name_empresa:['',Validators.required],
    NIT:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    repassword:['',Validators.required],
  },{validators: passwordValidator('password','repassword')})

  OnSignUpEmpresa(){
    let empresa= this.signupEmpresasForm.value as Empresa;

    if(this.signupEmpresasForm.hasError('passwordMismatch')){
      this.alert.error("Las contraseñas no coinciden");
      return
    }

    if(this.signupEmpresasForm.invalid){
      this.alert.error('Campos incorrectos');
      return 
    }

    let response= this.auth.signUp(empresa)
    
    if(!!response.succes){
      this.alert.success(response.message);
      this.router.navigate(['/login'])
    }
    else{
    this.alert.error(response.message)
    }
  }
}
