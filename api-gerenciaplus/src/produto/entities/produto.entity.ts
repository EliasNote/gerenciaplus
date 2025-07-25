import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Loja } from '../../loja/entities/loja.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  descricao: string;

  @Column('float')
  preco_unitario: number;

  @Column('float')
  preco_venda: number;

  @Column()
  quantidade: number;

  @Column()
  unidade_medida: string;

  @Column()
  quantidade_reposicao: number;

  @ManyToOne(() => Loja)
  loja: Loja;
}
