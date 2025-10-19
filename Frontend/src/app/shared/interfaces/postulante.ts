interface CV {
  experiencia: string;
  curriculum: string;
}

interface Estudio {
  titulo: string;
  nivel: string;
  certificado: string;
}

interface Habilidad {
  nombre: string;
  certificado: string;
}

interface Idioma {
  nombre: string;
  certificado: string;
}

interface PerfilPostulanteModel {
  id_perfil?: string;
  name: string;
  lastname: string;
}
