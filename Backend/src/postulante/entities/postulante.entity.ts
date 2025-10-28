import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Estudio } from 'src/estudios/entities/estudio.entity';
import { DetalleEstudio } from 'src/detalles_estudios/entities/detalle_estudio.entity';
import { PostulanteHabilidades } from 'src/postulante_habilidades/entities/postulante_habilidades.entity';
import { PostulanteIdioma } from 'src/postulante_idiomas/entities/postulante_idioma.entity';
import { VacantesIdioma } from 'src/vacantes_idiomas/entities/vacantes_idioma.entity';
import { Match } from 'src/matches/entities/match.entity';
import { Interaccion } from 'src/interaccion/entities/interaccion.entity';

@Entity('postulantes')
export class Postulante {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
  })
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  lastname: string;
  @Column({ type: 'int', nullable: true })
  experiencia: number;
  @Column({ type: 'varchar', nullable: true })
  curriculum: string;
  @Column({ type: 'varchar', nullable: true })
  foto: string;
  @Column({ type: 'varchar', nullable: true })
  ubicacion: string;

  @OneToOne(() => User, (user) => user.postulante)
  @JoinColumn({ name: 'id_perfil' })
  user: User;

  @OneToMany(
    () => DetalleEstudio,
    (detalleEstudio) => detalleEstudio.postulante,
  )
  @JoinTable()
  postulanteEstudios: DetalleEstudio[];

  @OneToMany(() => PostulanteHabilidades, (ph) => ph.postulante)
  @JoinTable()
  postulanteHabilidades: PostulanteHabilidades[];

  @OneToMany(() => PostulanteIdioma, (pi) => pi.postulante)
  @JoinTable()
  postulanteIdiomas: PostulanteIdioma[];

  @OneToMany(() => Match, (match) => match.postulante)
  match: Match[];

  @OneToMany(() => Interaccion, (interaccion) => interaccion.postulante)
  interacciones: Interaccion[];
}
