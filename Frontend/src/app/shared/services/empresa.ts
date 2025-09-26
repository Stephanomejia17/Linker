import { Injectable } from '@angular/core';
import {v4 as uuid4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Empresa {
  guardarPerfil(perfil: PerfilEmpresaModel) {
    const empresakey = uuid4();
    localStorage.setItem(empresakey, JSON.stringify(perfil));
    return{succes:true , message:'Usuario registrado exitosamente'}
  }
}
