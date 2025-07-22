import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Loja } from '../../loja/entities/loja.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Loja)
  loja: Loja;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  nivel_acesso: string;
}
