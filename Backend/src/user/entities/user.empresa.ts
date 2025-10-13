import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("empresas")
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({type:'varchar'})
  name_empresa: string;
  @Column({type:'varchar'})
  NIT: string;
  @Column({type:'varchar'})
  email: string;
  @Column({type:'varchar'})
  password: string;
}