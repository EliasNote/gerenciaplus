import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Produto } from '../../produto/entities/produto.entity';

@Entity()
export class Loja {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_fantasia: string;

  @Column({ type: 'text', unique: true })
  cnpj: string;

  @Column({ type: 'date' })
  data_cadastro: Date = new Date();

  @OneToMany(() => Profile, (profile) => profile.loja)
  profiles: Profile[];

  @OneToMany(() => Produto, (produto) => produto.loja)
  produtos: Produto[];
}
