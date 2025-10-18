import { inject, Injectable } from '@angular/core';
import { v4 as uuid4 } from 'uuid';
import { Auth } from './auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PerfilPostulanteResponse {
  name: string;
  lastname: string;
}

@Injectable({
  providedIn: 'root',
})
export class Perfil {
  auth = inject(Auth);
  http = inject(HttpClient);

  getUserNamePostulante(id: string): Observable<PerfilPostulanteResponse> {
    return this.http.get<PerfilPostulanteResponse>(`http://localhost:3000/postulante/${id}`);
  }

  getUserNameEmpresa(id: string): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(`http://localhost:3000/empresa/${id}`);
  }

  /*guardarPerfil(perfil: PerfilPostulanteModel| PerfilEmpresaModel) {
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
  }*/
}
