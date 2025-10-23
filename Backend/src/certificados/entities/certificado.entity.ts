import { DetallesCertificado } from 'src/detalles_certificados/entities/detalles_certificado.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('certificados')
export class Certificado {
  @PrimaryGeneratedColumn('uuid')
  id_certificado: string;

  @Column({ type: 'varchar' })
  entidad_emisora: string;

  @Column({ type: 'varchar' })
  nombre_certificado: string;

  @OneToMany(() => DetallesCertificado, (dc) => dc.certificado)
  detallesCertificados: DetallesCertificado[];
}
