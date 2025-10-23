import { Habilidades } from 'src/habilidades/entities/habilidades.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacante_habilidades')
export class VacanteHabilidade {
  @PrimaryGeneratedColumn('uuid')
  id_vacante_habilidade: string;

  @ManyToOne(() => Vacante, (vacante) => vacante.vacanteHabilidades, {
    onDelete: 'CASCADE',
  })
  vacante: Vacante;

  @ManyToOne(
    () => Habilidades,
    (habilidades) => habilidades.vacanteHabilidades,
    {
      onDelete: 'CASCADE',
    },
  )
  habilidades: Habilidades;
}
