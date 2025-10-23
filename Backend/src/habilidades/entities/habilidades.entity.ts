import { PostulanteHabilidades } from 'src/postulante_habilidades/entities/postulante_habilidades.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('habilidades')
export class Habilidades {
  @PrimaryGeneratedColumn('uuid')
  id_habilidad: string;

  @Column({ type: 'varchar' })
  nombre_habilidad: string;

  @OneToMany(() => PostulanteHabilidades, (ph) => ph.habilidades)
  postulanteHabilidades: PostulanteHabilidades[];
}
