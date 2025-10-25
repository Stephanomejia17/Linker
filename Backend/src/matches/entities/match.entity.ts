import { Postulante } from 'src/postulante/entities/postulante.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id_match: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  /*@ManyToOne(() => Vacante, (vacante) => vacante.matches, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_vacante' })
  vacante: Vacante;

  @ManyToOne(() => Postulante, (postulante) => postulante.matches, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_postulante' })
  postulante: Postulante;

 /* @Column({ type: 'enum', enum: Accion })
  accion: Accion;*/
}
