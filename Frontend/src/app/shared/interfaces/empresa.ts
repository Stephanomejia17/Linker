interface Vacante {
  id_vacante:string;
  titulo: string;
  tipo_trabajo: string;
  modalidad: string;
  salario: number;
  ubicacion: string;
  empresa:Empresa;
  habilidades?: any[];
  idiomas?: any[];
  
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
interface Empresa {
  id_perfil: string;
  name_empresa: string;
  NIT: string;
}
