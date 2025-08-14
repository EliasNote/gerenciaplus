import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Loja } from '../../loja/entities/loja.entity';
import { Fornecedor } from '../../fornecedor/entities/fornecedor.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.produtos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fornecedorId' })
  fornecedor: Fornecedor;

  @ManyToOne(() => Loja, (loja) => loja.produtos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lojaId' })
  loja: Loja;
}
