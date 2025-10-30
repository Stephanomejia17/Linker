import { Certificado } from 'src/certificados/entities/certificado.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalles_certificados')
export class DetallesCertificado {
  @PrimaryGeneratedColumn()
  id_detalles_certificados: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.detallesCertificados, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @ManyToOne(
    () => Certificado,
    (certificado) => certificado.detallesCertificados,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'id_certificado' })
  certificado: Certificado;

  @Column({ type: 'date' })
  fecha_emision: Date;

  @Column({ type: 'date' })
  fecha_caducidad: Date | null;
}
