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
  id_habilidad: number;
  nombre_habilidad:string;
}

interface Idioma {
  id_idioma: number;
  nombre: string;
}

interface PerfilPostulanteModel {
  id_perfil?: number;
  name: string;
  lastname: string;
}

interface Postulante{
  id:number;
  name:string;
  lastname:string;
  anos_experiencia:number;
  curriculum:string;
  foto:string;
  ubicacion:string;
  habilidades?: any[]
  idiomas?:any[]
}
