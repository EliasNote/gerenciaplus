import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from '../usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './oauth2.strategy';

@Module({
  imports: [
    ConfigModule,
    UsuarioModule,
    PassportModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule{}