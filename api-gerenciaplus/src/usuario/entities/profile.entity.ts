import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Loja } from '../../loja/entities/loja.entity';
@Entity('profiles')
export class Profile {

  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text' })
  sobrenome: string;

  @ManyToOne(() => Loja, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'loja_id' })
  loja: Loja;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date = new Date();
}
