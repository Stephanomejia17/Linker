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
  cv: CV[];
  estudios: Estudio[];
  habilidades: Habilidad[];
  idiomas: Idioma[];
}
