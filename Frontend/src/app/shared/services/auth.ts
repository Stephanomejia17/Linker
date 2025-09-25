import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  signUp(user: User){
    if (localStorage.getItem(user.email)){
      return{succes:false, message:'Usuario ya se encuentra registrado'}
    }

    localStorage.setItem(user.email, JSON.stringify(user));
    return{succes:true , message:'Usuario registrado exitosamente'}
  }

  login(user:User){
    

  }
  
}
