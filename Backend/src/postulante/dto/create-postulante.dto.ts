export class CreatePostulanteDto {
  name: string;
  lastname: string;
  años_experiencia?: number;
  curriculum?: string;
  foto?: string;
  ubicacion?: string;
  id_perfil?: string;
}