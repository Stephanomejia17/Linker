import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-perfil-postulante',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './perfil-postulante.html',
  styleUrls: ['./perfil-postulante.css']
})
export class PerfilPostulante {
  estudios = [{ titulo: '', nivel: '' , certificado: ''}];
  habilidades = [{ nombre: '', certificado: '' }];
  idiomas = [{ nombre: '', certificado: '' }];

  agregarEstudio() {
    this.estudios.push({ titulo: '', nivel: '' , certificado: ''});
  }

  agregarHabilidad() {
    this.habilidades.push({ nombre: '', certificado: '' });
  }

  agregarIdioma() {
    this.idiomas.push({ nombre: '', certificado: '' });
  }
}
