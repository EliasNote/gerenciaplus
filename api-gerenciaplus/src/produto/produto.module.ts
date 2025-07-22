import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { LojaModule } from 'src/loja/loja.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), LojaModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
