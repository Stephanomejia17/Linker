import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Alerts } from '../../shared/services/alerts';
import { Perfil } from '../../shared/services/perfil';


@Component({
  selector: 'app-perfil-postulante',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './perfil-postulante.html',
  styleUrls: ['./perfil-postulante.css']
})
export class PerfilPostulante {
  alert=inject(Alerts);
  postulante = inject(Perfil);
  fb=inject(FormBuilder);
  router=inject(Router);

  postulanteForm = this.fb.group({
    experiencia: ['', Validators.required],
    cv: [''],
    estudios: this.fb.array([this.crearEstudio()]),
    habilidades: this.fb.array([this.crearHabilidad()]),
    idiomas: this.fb.array([this.crearIdioma()])
  });

  get estudiosForm(): FormArray {
    return this.postulanteForm.get('estudios') as FormArray;
  }
  get habilidadesForm(): FormArray {
    return this.postulanteForm.get('habilidades') as FormArray;
  }
  get idiomasForm(): FormArray {
    return this.postulanteForm.get('idiomas') as FormArray;
  }

  crearEstudio() {
    return this.fb.group({
      titulo: ['', Validators.required], nivel: ['', Validators.required], certificado: ''
    });
  }

  crearHabilidad() {
    return this.fb.group({
      nombre: ['', Validators.required], certificado: ''
    });
  }

  crearIdioma() {
    return this.fb.group({
      nombre: ['', Validators.required], certificado: ''
    });
  }

  agregarEstudio() {
    if (this.estudiosForm.length < 5) {
      this.estudiosForm.push(this.crearEstudio());
    }
  }

  agregarHabilidad() {
    if (this.habilidadesForm.length < 5) {
      this.habilidadesForm.push(this.crearHabilidad());
    }
  }

  agregarIdioma() {
    if (this.idiomasForm.length < 5) {
      this.idiomasForm.push(this.crearIdioma());
    }
  }

  eliminarEstudio(index: number) {
    if (this.estudiosForm.length > 1) {
      this.estudiosForm.removeAt(index);
    }
  }

  eliminarHabilidad(index: number) {
    if (this.habilidadesForm.length > 1) {
      this.habilidadesForm.removeAt(index);
    }
  }

  eliminarIdioma(index: number) {
    if (this.idiomasForm.length > 1) {
      this.idiomasForm.removeAt(index);
    }
  }

  OnPostulante() {
    if (this.postulanteForm.invalid) {
      this.alert.error('Campos incorrectos');
      return;
    }

    // @ts-ignore
    const perfil = this.postulanteForm.value as PerfilPostulanteModel;
    const response = this.postulante.guardarPerfil(perfil);

    if (!!response.success) {
      this.alert.success(response.message);
      this.router.navigate(['/match']);
    } else {
      this.alert.error(response.message);
    }
  }
}
