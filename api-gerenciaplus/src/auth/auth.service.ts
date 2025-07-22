import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt.strategy';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, senha: string) {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.login(usuario);
  }

  login(usuario: Usuario) {
    const payload: JwtPayload = {
      username: usuario.email,
      sub: usuario.id,
      nivel_acesso: usuario.nivel_acesso,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'),
      }),
    };
  }
}
