import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(AuthGuard('oauth2'))
  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @UseGuards(AuthGuard('oauth2'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usuarioService.findOne(+id);
  }

  @UseGuards(AuthGuard('oauth2'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return await this.usuarioService.update(+id, updateUsuarioDto);
  }

  @UseGuards(AuthGuard('oauth2'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usuarioService.remove(+id);
  }

  @Patch()
  async login(@Body() loginDto: LoginUsuarioDto) {
    return await this.usuarioService.login(loginDto);
  }
}
