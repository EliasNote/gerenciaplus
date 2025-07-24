import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { LojaModule } from 'src/loja/loja.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), LojaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, AuthService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
