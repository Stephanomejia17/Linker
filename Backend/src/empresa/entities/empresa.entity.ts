import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  name_empresa: string;
  @Column({ type: 'varchar', nullable: true })
  descripcion: string;
  @Column({ type: 'varchar', nullable: true })
  foto: string;
  @Column({ type: 'varchar' })
  NIT: string;

  @OneToOne(() => User, (user) => user.empresa)
  @JoinColumn({ name: 'id_perfil' })
  user: User;
}
