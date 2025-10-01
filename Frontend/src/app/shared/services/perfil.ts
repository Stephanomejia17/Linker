import { inject, Injectable } from '@angular/core';
import {v4 as uuid4} from 'uuid';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})


export class Perfil{

  auth=inject(Auth) 
  
  guardarPerfil(perfil: PerfilPostulanteModel| PerfilEmpresaModel) {
    let user= this.auth.getUser()
    if(user){
      let userData= localStorage.getItem(user)
      if(userData){
        let parsedUser = JSON.parse(userData);
        parsedUser.perfil= perfil;
        localStorage.setItem(user, JSON.stringify(parsedUser));
        return{success:true , message:'Usuario registrado exitosamente'}
      }
      return{success:false , message:'Usuario no encontrado'}
    }  

    return{success:false , message:'Usuario np encontrado :)'}
  }
}
