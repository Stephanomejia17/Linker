import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Perfil } from '../../../shared/services/perfil';
import { Match } from '../../../shared/services/match';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-empresa-certificados',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-empresa-certificados.html',
  styleUrl: './perfil-empresa-certificados.css',
})
export class PerfilEmpresaCertificados {
  fb = inject(FormBuilder);
  perfil = inject(Perfil);
  match = inject(Match);

  isOpen = false;
  activeTab: 'form' | 'list' = 'form';
  mostrarDropdown = false; // controla si la lista se muestra o no
  
  idEmpresa=sessionStorage.getItem('perfilId');

  certificados: Certificado[] = [];
  certificadoSeleccionado: Certificado | null = null;
  certificadosOfEmpresa: CertificadoEmpresa[] = [];

  nuevoCertificado: FormGroup = this.fb.group({
    id_certificado: [''],
    id_empresa: [''],
    fechaEmision: [''],
    fechaCaducidad: [''],
  });

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  setActiveTab(tab: 'form' | 'list') {
    this.activeTab = tab;
  }

  toggleListaCertificados() {
    this.mostrarDropdown = !this.mostrarDropdown;
    this.perfil.getCerticados().subscribe({
      next: (res: Certificado[]) => {
        this.certificados = res;
        console.log(this.certificados);
      },
      error: () => console.error('Error al cargar habilidades'),
    });
    console.log(this.certificados, 'certificados');
  }

  seleccionarCertificado(cert: Certificado) {
    this.certificadoSeleccionado = cert;
    this.mostrarDropdown = false;
    //this.nuevoCertificado.patchValue({ id_certificado: cert.id_certificado });
    console.log('ID seleccionado:', cert.id_certificado);
  }

  //  Cargar certificados de la empresa
  cargarCertificados() {
    console.log('desde cargar certificados', this.idEmpresa)

    this.perfil.getCertificadosOfEmpresa(+this.idEmpresa!).subscribe({
      next: (data: CertificadoEmpresa[] )=>{
        this.certificadosOfEmpresa= data
        console.log(this.certificadosOfEmpresa, 'certificados de la empresa')
      },
      error:(err)=>{
        console.log(err, 'error al obtener vacantes')
      }
    })
  }

  agregarCertificado() {

    const certificado = this.nuevoCertificado.value;

    const data: CrearCertificadoEmpresa = {
      certificado: { id_certificado: this.certificadoSeleccionado?.id_certificado! },
      empresa: { id: +this.idEmpresa! },
      fecha_emision: certificado.fechaEmision,
      fecha_caducidad: certificado.fechaCaducidad,
    };
    
    console.log('certificado',data)

    this.perfil.createCertificado(data).subscribe()

  }

  //  Guardar certificados
  guardarCertificados() {
    /*if (this.nuevoCertificado.invalid) return;

    const id_empresa = sessionStorage.getItem('empresaId') || '';
    const certificadosData = this.nuevoCertificado.value.certificados;

    // Reiniciar formulario
    this.nuevoCertificado.reset();
    this.certificadosForm.clear();
    this.agregarCertificado();*/
  }
  //nuevoCertificado!: FormGroup;
}
