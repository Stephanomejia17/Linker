import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './perfil-empresa.html',
  styleUrl: './perfil-empresa.css'
})
export class PerfilEmpresa {
    vacantes = [{ titulo: '', descripcion: '' , salario: '', modalidad: '', 
      tipo_trabajo: '', ubicacion: '', habilidad: '', idioma: ''}];
  
    agregarVacante() {
      this.vacantes.push({ titulo: '', descripcion: '' , salario: '', modalidad: '', 
      tipo_trabajo: '', ubicacion: '', habilidad: '', idioma: ''});
    }
}
