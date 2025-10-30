interface Vacante {
  id_vacante:number;
  titulo: string;
  tipo_trabajo: string;
  modalidad: string;
  salario: number;
  ubicacion: string;
  empresa:Empresa;
  habilidades?: any[];
  idiomas?: any[];
  
}

interface CrearVacante{
  id_vacante:number;
  titulo: string;
  tipo_trabajo: string;
  tipo_modalidad: string;
  salario: number;
  ubicacion: string;
  empresa:Empresa;
  vacanteHabilidades?: any[];
  vacantesIdiomas?: any[];
}

interface CertificadoEmpresa {
  id_detalles_certificados: number;
  certificado: {
    //id_certificado: string;
    entidad_emisora: string;
    nombre_certificado: string;
  };
  fecha_emision: string;
  fecha_caducidad: string;
  /*id_certificado: string;
  id_empresa: string;  
  fechaEmision: string;
  fechaCaducidad: string;*/
  
}

interface CrearCertificadoEmpresa {
  certificado: {
    id_certificado: number;
  };
  empresa: {
    id: number;
  };
  fecha_emision: string;
  fecha_caducidad: string;
}

interface Certificado{
  id_certificado: number;
  entidad_emisora: string;
  nombre_certificado: string
}

interface PerfilEmpresaModel {
  descripcion: number;
  vacantes: Vacante[];
  certificados: CertificadoEmpresa[];
}
interface Empresa {
  id_perfil: number;
  name_empresa: string;
  NIT: string;
}
