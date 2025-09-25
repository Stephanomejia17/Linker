import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil-postulante',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './perfil-postulante.html',
  styleUrls: ['./perfil-postulante.css']
})
export class PerfilPostulante {
  estudios = [{ titulo: '', nivel: '' , certificado: ''}];
  habilidades = [{ nombre: '', certificado: '' }];
  idiomas = [{ nombre: '', certificado: '' }];

  agregarEstudio() {
    if (this.estudios.length < 5) {
      this.estudios.push({ titulo: '', nivel: '' , certificado: ''});
    }
  }

  agregarHabilidad() {
    if (this.habilidades.length < 5) {
      this.habilidades.push({ nombre: '', certificado: '' });
    }
  }

  agregarIdioma() {
    if (this.idiomas.length < 5) {
      this.idiomas.push({ nombre: '', certificado: '' });
    }
  }

  eliminarEstudio(index: number) {
    if (this.estudios.length > 1) {
      this.estudios.splice(index, 1);
    }
  }

  eliminarHabilidad(index: number) {
    if (this.habilidades.length > 1) {
      this.habilidades.splice(index, 1);
    }
  }

  eliminarIdioma(index: number) {
    if (this.idiomas.length > 1) {
      this.idiomas.splice(index, 1);
    }
  }
}
