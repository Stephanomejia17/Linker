import { DetalleEstudio } from 'src/detalles_estudios/entities/detalle_estudio.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Niveles {
  PRIMARIA = 'Primaria',
  SECUNDARIA = 'Secundaria',
  TECNICO = 'Técnico',
  UNIVERSITARIO = 'Universitario',
  POSTGRADO = 'Postgrado',
  MAESTRIA = 'Maestría',
  DOCTORADO = 'Doctorado',
}

@Entity('estudios')
export class Estudio {
  @PrimaryGeneratedColumn('uuid')
  id_estudio: string;

  @Column({ type: 'varchar' })
  titulo: string;

  @Column({ type: 'varchar', nullable: true })
  nivel: Niveles;
  
  @OneToMany(() => DetalleEstudio, (detalleEstudio) => detalleEstudio.estudio)
  postulanteEstudios: DetalleEstudio[];
}
