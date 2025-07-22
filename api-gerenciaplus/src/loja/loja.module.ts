import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Loja])],
  controllers: [LojaController],
  providers: [LojaService],
  exports: [LojaService],
})
export class LojaModule {}
