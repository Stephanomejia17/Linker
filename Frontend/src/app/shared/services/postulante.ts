import { Injectable } from '@angular/core';
import {v4 as uuid4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Postulante {
  guardarPerfil(perfil: PerfilPostulanteModel) {
    const postulantekey = uuid4();
    localStorage.setItem(postulantekey, JSON.stringify(perfil));
    return{success:true , message:'Usuario registrado exitosamente'}
  }
}
