import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from './perfil';

@Injectable({
  providedIn: 'root',
})
export class Match {

    http=inject(HttpClient)
    isEmpresa=sessionStorage.getItem('isEmpresa')
    user = sessionStorage.getItem('userId')

    getVacantesForEmpresa():Observable<any>{
        return this.http.get(`http://localhost:3000/vacantes/empresaId/${this.user}`)

    }

    getVacantes():Observable<any>{
        return this.http.get(`http://localhost:3000/vacantes/vacantes/${this.user}`)
    }

    onAction(){}

    //getPostulantes():Observable<any>{}
    
    onLike(){
        if(this.isEmpresa){
            console.log('like Empresa')

        }
        else{
            console.log('Like User')
        }

    }

    onDislike(){
        if(this.isEmpresa){
            console.log('dislke Empresa')

        }
        else{
            console.log('dislike User')
        }

        
    }

}
