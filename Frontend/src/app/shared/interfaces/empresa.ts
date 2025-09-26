interface Vacante {
  titulo: string;
  descripcion: string;
  salario: number;
  modalidad: string;
  tipo: string;
  ubicacion: string;
  habilidades: string[];
  idiomas: string[];
}

interface CertificadoEmpresa {
  nombre: string;
  entidadEmisora: string;
  fechaEmision: string;
  fechaCaducidad: string;
}

interface PerfilEmpresaModel {
  descripcion: string;
  vacantes: Vacante[];
  certificados: CertificadoEmpresa[];
}
