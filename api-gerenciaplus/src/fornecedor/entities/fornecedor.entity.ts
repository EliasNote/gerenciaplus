import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity('fornecedores')
export class Fornecedor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text', nullable: true })
  cnpj: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  telefone: string;

  @OneToMany(() => Produto, (produto) => produto.fornecedor)
  produtos: Produto[];

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date = new Date();
}
