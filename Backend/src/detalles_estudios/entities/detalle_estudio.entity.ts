import { Estudio } from 'src/estudios/entities/estudio.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalles_estudios')
export class DetalleEstudio {
  @PrimaryGeneratedColumn()
  id_detalle_estudios: number;

  @ManyToOne(() => Postulante, (postulante) => postulante.postulanteEstudios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_postulante' })
  postulante: Postulante;

  @ManyToOne(() => Estudio, (estudio) => estudio.postulanteEstudios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_estudio' })
  estudio: Estudio;

  @Column({ type: 'varchar' })
  certificado: string;
}
