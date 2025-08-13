import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { LojaModule } from 'src/loja/loja.module';
import { FornecedorModule } from 'src/fornecedor/fornecedor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    LojaModule,
    forwardRef(() => FornecedorModule),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
