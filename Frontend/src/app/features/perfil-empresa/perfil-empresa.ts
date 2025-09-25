import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './perfil-empresa.html',
  styleUrl: './perfil-empresa.css'
})
export class PerfilEmpresa {
    vacantes = [{ titulo: '', descripcion: '' , salario: '', modalidad: '', 
      tipo_trabajo: '', ubicacion: '', habilidad: '', idioma: ''}];
  
    agregarVacante() {
      if (this.vacantes.length < 5) {
        this.vacantes.push({ titulo: '', descripcion: '' , salario: '', modalidad: '', 
        tipo_trabajo: '', ubicacion: '', habilidad: '', idioma: ''});
      }
    }

    eliminarVacante(index: number) {
      if (this.vacantes.length > 1) {
        this.vacantes.splice(index, 1);
      }
  }
}
