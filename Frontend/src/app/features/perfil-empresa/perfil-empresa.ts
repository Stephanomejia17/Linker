import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Alerts } from '../../shared/services/alerts';
import { Perfil } from '../../shared/services/perfil';


@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './perfil-empresa.html',
  styleUrl: './perfil-empresa.css'
})
export class PerfilEmpresa {
    alert=inject(Alerts);
    empresa=inject(Perfil)
    fb=inject(FormBuilder);
    router=inject(Router);

    empresaForm=this.fb.group({
      descripcion: ['', Validators.required],
      vacantes: this.fb.array([
        this.crearVacante()
      ]),
      certificados: this.fb.array([
        this.crearCertificado()
      ])
    })

    get vacantesForm(): FormArray {
      return this.empresaForm.get('vacantes') as FormArray;
    }

    get certificadosForm(): FormArray {
      return this.empresaForm.get('certificados') as FormArray;
    }

    crearVacante() {
      return this.fb.group({
        titulo: ['', Validators.required], descripcion: ['', Validators.required] , 
        salario: ['', Validators.required], modalidad: ['', Validators.required], 
        tipo_trabajo: ['', Validators.required], ubicacion: ['', Validators.required],
         habilidad: ['', Validators.required], idioma: ['', Validators.required]});
    }

    crearCertificado() {
      return this.fb.group({
        nombre: ['', Validators.required], entidadEmisora: ['', Validators.required], 
        fechaEmision: ['', Validators.required], fechaCaducidad: ['', Validators.required]});
    }
  
    agregarVacante() {
      if (this.vacantesForm.length < 5) {
        this.vacantesForm.push(this.crearVacante());
      }
    }

    eliminarVacante(index: number) {
      if (this.vacantesForm.length > 1) {
        this.vacantesForm.removeAt(index);
      }
    }

    agregarCertificado() {
      if (this.certificadosForm.length < 5) {
        this.certificadosForm.push(this.crearCertificado());
      }
    }

    eliminarCertificado(index: number) {
      if (this.certificadosForm.length > 1) {
        this.certificadosForm.removeAt(index);
      }
    }

    OnEmpresa() {
      if (this.empresaForm.invalid) {
        this.alert.error('Campos incorrectos');
        return;
      }
      // @ts-ignore
      const perfil = this.empresaForm.value as PerfilEmpresaModel;
      const response = this.empresa.guardarPerfil(perfil);

      if (!!response.success) {
        this.alert.success(response.message);
        this.router.navigate(['/match']);
      } else {
        this.alert.error(response.message);
      }
    }
}
