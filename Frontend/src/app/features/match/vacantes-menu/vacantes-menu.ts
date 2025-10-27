import { Component, inject } from '@angular/core';
import { Match } from '../../../shared/services/match';

@Component({
  selector: 'app-vacantes-menu',
  imports: [],
  templateUrl: './vacantes-menu.html',
  styleUrl: './vacantes-menu.css'
})
export class VacantesMenu {

  match=inject(Match)

  vacantes = [
    /*{ id: 1, nombre: 'Desarrollador Frontend' },
    { id: 2, nombre: 'Diseñador UX/UI' },
    { id: 3, nombre: 'QA Tester' },
    { id: 4, nombre: 'Project Manager' }*/
  ];

  mostrarLista = false;
  vacanteSeleccionada: string | null = null;

  getVacantes(){
    this.match.getVacantesForEmpresa().subscribe({
      next: (data)=>{
        this.vacantes= data
      },
      error:(err)=>{
        console.log('no hay vacantes')
      }
    });
  }

  toggleLista() {
    this.mostrarLista = !this.mostrarLista;
  }

  seleccionarVacante(vacante: any) {
    this.vacanteSeleccionada = vacante.nombre;
    this.mostrarLista = false;
    console.log('Vacante seleccionada:', vacante);
  } 
}
