import { Idioma } from 'src/idiomas/entities/idioma.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacante_idiomas')
export class VacantesIdioma {
  @PrimaryGeneratedColumn()
  id_vacante_idiomas: number;

  @ManyToOne(() => Vacante, (vacante) => vacante.vacantesIdiomas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_vacante' })
  vacante: Vacante;

  @ManyToOne(() => Idioma, (idioma) => idioma.vacantesIdiomas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_idioma' })
  idioma: Idioma;
}
