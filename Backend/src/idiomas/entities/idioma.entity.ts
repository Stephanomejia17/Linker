import { PostulanteIdioma } from 'src/postulante_idiomas/entities/postulante_idioma.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('idiomas')
export class Idioma {
  @PrimaryGeneratedColumn('uuid')
  id_idioma: string;

  @Column({ type: 'varchar', unique: true })
  nombre: string;

  @OneToMany(() => PostulanteIdioma, (pi) => pi.idioma)
  postulanteIdiomas: PostulanteIdioma[];
}
