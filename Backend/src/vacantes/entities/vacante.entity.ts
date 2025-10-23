import { Empresa } from 'src/empresa/entities/empresa.entity';
import { VacanteHabilidade } from 'src/vacante_habilidades/entities/vacante_habilidade.entity';
import { VacantesIdioma } from 'src/vacantes_idiomas/entities/vacantes_idioma.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TipoTrabajo {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRATO = 'Contrato',
  PRACTICAS = 'Prácticas',
}

export enum TipoModalidad {
  PRESENCIAL = 'Presencial',
  REMOTO = 'Remoto',
  HIBRIDO = 'Híbrido',
}

@Entity('vacantes')
export class Vacante {
  @PrimaryGeneratedColumn('uuid')
  id_vacante: string;

  @Column({ type: 'varchar' })
  titulo: string;

  @Column({ type: 'enum', enum: TipoTrabajo })
  tipo_trabajo: TipoTrabajo;

  @Column({ type: 'enum', enum: TipoModalidad })
  modalidad: TipoModalidad;

  @Column({ type: 'float' })
  salario: number;

  @Column({ type: 'varchar' })
  ubicacion: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.vacantes, {
    onDelete: 'CASCADE',
  })
  empresa: Empresa;

  @OneToMany(() => VacantesIdioma, (vi) => vi.vacante)
  vacantesIdiomas: VacantesIdioma[];

  @OneToMany(() => VacanteHabilidade, (vh) => vh.vacante)
  vacanteHabilidades: VacanteHabilidade[];
}
