import { Empresa } from 'src/empresa/entities/empresa.entity';
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
  @PrimaryGeneratedColumn()
  id_match: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  /*@ManyToOne(()=> Empresa, (empresa)=>empresa.match, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;*/

  @ManyToOne(()=> Vacante, (vacante)=>vacante.match, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'id_vacante' })
  vacante: Vacante;

  @ManyToOne(()=> Postulante, (postulante)=>postulante.match ,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'id_postulante' })
  postulante: Postulante;
}
