import { Idioma } from 'src/idiomas/entities/idioma.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('postulante_idiomas')
export class PostulanteIdioma {
  @PrimaryGeneratedColumn()
  id_postulante_idiomas: number;

  @Column({ type: 'varchar' })
  certificado: string;

  @ManyToOne(() => Postulante, (postulante) => postulante.postulanteIdiomas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_postulante' })
  postulante: Postulante;

  @ManyToOne(() => Idioma, (idioma) => idioma.postulanteIdiomas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_idioma' })
  idioma: Idioma;
}
