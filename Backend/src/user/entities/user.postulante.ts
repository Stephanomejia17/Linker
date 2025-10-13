import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("postulantes")
export class Postulante {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({type:'varchar'})
  name: string;
  @Column({type:'varchar'})
  lastname: string;
  @Column({type:'varchar'})
  email: string;
  @Column({type:'varchar'})
  password: string;
}