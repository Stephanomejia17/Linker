import { PostulanteHabilidades } from 'src/postulante_habilidades/entities/postulante_habilidades.entity';
import { VacanteHabilidade } from 'src/vacante_habilidades/entities/vacante_habilidade.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('habilidades')
export class Habilidades {
  @PrimaryGeneratedColumn()
  id_habilidad: number;

  @Column({ type: 'varchar' })
  nombre_habilidad: string;

  @OneToMany(() => PostulanteHabilidades, (ph) => ph.habilidades)
  postulanteHabilidades: PostulanteHabilidades[];

  @OneToMany(() => VacanteHabilidade, (vh) => vh.habilidades)
  vacanteHabilidades: VacanteHabilidade[];
}
