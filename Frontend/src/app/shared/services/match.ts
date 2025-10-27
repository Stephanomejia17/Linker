import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from './perfil';

@Injectable({
  providedIn: 'root',
})
export class Match {

    http=inject(HttpClient)
    isEmpresa=sessionStorage.getItem('isEmpresa');
    user = sessionStorage.getItem('userId');
    perfil= sessionStorage.getItem('perfilId');

    getVacantesForEmpresa():Observable<any>{
        return this.http.get(`http://localhost:3000/vacantes/empresaId/${this.perfil}`)

    }

    getVacantes():Observable<any>{
        return this.http.get(`http://localhost:3000/vacantes/vacantes/${this.perfil}`)
    }

    getPostulantes(vacanteId:string):Observable<any>{
        return this.http.get(`http://localhost:3000/postulante/postulantes/${vacanteId}`)
    }

    onAction(interaccion:Interaccion):Observable<any>{
        return this.http.post(`http://localhost:3000/interacciones`, interaccion )
    }
    
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
