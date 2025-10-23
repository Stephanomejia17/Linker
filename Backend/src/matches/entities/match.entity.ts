import { Postulante } from 'src/postulante/entities/postulante.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Accion {
  LIKE = 'Like',
  DISLIKE = 'Dislike',
}

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id_match: string;

  @ManyToOne(() => Vacante, (vacante) => vacante.matches, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_vacante' })
  vacante: Vacante;

  @ManyToOne(() => Postulante, (postulante) => postulante.matches, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_postulante' })
  postulante: Postulante;

  @Column({ type: 'enum', enum: Accion })
  accion: Accion;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;
}
