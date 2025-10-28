import { Component, inject } from '@angular/core';
import { Match } from '../../../shared/services/match';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-vacantes-menu',
  imports: [],
  templateUrl: './vacantes-menu.html',
  styleUrl: './vacantes-menu.css'
})
export class VacantesMenu {

  match=inject(Match)
  auth=inject(Auth)
  vacantes: Vacante[]= [];
  
  mostrarLista = false;
  vacanteSeleccionada: Vacante|null = null;

  getVacantes(){
    console.log(sessionStorage.getItem('perfilId'))
    this.match.getVacantesForEmpresa().subscribe({
      next: (data: Vacante[])=>{
        console.log(sessionStorage.getItem('perfilId'))
        this.vacantes= data
        console.log(data)
      },
      error:(err)=>{
        console.log('no hay vacantes')
      }
    });
  }

  toggleLista() {
    this.mostrarLista = !this.mostrarLista;
    if(this.vacantes.length===0){
     this.getVacantes()
    }
  }

  seleccionarVacante(vacante: any) {    
    this.vacanteSeleccionada = vacante;
    sessionStorage.setItem('vacante', this.vacanteSeleccionada?.id_vacante || '');

    this.mostrarLista = false;
    console.log('Vacante seleccionada:', vacante);
  } 
}
