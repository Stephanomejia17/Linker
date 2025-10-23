import { Estudio } from 'src/estudios/entities/estudio.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('detalle_estudios')
export class DetalleEstudio {
  @PrimaryGeneratedColumn('uuid')
  id_detalle_estudios: string;

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
}
