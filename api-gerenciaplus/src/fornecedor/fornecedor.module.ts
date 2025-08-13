import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { Fornecedor } from './entities/fornecedor.entity';
import { ProdutoModule } from 'src/produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fornecedor]),
    forwardRef(() => ProdutoModule),
  ],
  controllers: [FornecedorController],
  providers: [FornecedorService],
  exports: [FornecedorService],
})
export class FornecedorModule {}
