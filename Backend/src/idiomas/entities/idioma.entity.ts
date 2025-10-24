import { PostulanteIdioma } from 'src/postulante_idiomas/entities/postulante_idioma.entity';
import { VacantesIdioma } from 'src/vacantes_idiomas/entities/vacantes_idioma.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('idiomas')
export class Idioma {
  @PrimaryGeneratedColumn()
  id_idioma: number;

  @Column({ type: 'varchar', unique: true })
  nombre: string;

  @OneToMany(() => PostulanteIdioma, (pi) => pi.idioma)
  postulanteIdiomas: PostulanteIdioma[];

  @OneToMany(() => VacantesIdioma, (vi) => vi.idioma)
  vacantesIdiomas: VacantesIdioma[];
}
