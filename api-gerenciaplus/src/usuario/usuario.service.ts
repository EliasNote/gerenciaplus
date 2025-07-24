/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LojaService } from 'src/loja/loja.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcryptjs';
import { UsuarioResponseDto } from './dto/response-usuario.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private lojaService: LojaService,
    private authService: AuthService
  ) {}

  async create(
    createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    const loja = await this.lojaService.findOne(createUsuarioDto.lojaId);
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: hashedPassword,
      loja,
    });
    const usuarioSave = await this.usuarioRepository.save(usuario);
    await this.authService.create(createUsuarioDto)

    return this.generateUsuarioResponseDto(usuarioSave);
  }

  async findAll(): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((x) => this.generateUsuarioResponseDto(x));
  }

  async findOne(id: number): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: id },
    });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return this.generateUsuarioResponseDto(usuario);
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Usuário não encontrado');
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { email } });
  }

  generateUsuarioResponseDto(usuario: Usuario): UsuarioResponseDto {
    return {
      id: usuario.id,
      nome: usuario.nome,
      sobreNome: usuario.sobreNome,
      email: usuario.email,
      nivelAcesso: usuario.nivelAcesso,
    };
  }
}
