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
import { DetalleEstudio } from 'src/detalle_estudios/entities/detalle_estudio.entity';
import { PostulanteHabilidades } from 'src/postulante_habilidades/entities/postulante_habilidades.entity';
import { PostulanteIdioma } from 'src/postulante_idiomas/entities/postulante_idioma.entity';

@Entity('postulantes')
export class Postulante {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  lastname: string;
  @Column({ type: 'int', nullable: true })
  años_experiencia: number;
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
}
