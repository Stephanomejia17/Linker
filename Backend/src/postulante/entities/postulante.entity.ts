import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('postulantes')
export class Postulante {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  lastname: string;
  @Column({ type: 'int', nullable: true })
  años_experiencia: number;
  @Column({ type: 'varchar', nullable: true })
  curriculum: string;
  @Column({ type: 'varchar', nullable: true })
  foto: string;
  @Column({ type: 'varchar', nullable: true })
  ubicacion: string;

  @OneToOne(() => User, (user) => user.postulante)
  @JoinColumn({ name: 'id_perfil' })
  user: User;
}
