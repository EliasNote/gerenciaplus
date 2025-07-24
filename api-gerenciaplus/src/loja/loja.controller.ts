import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  async create(@Body() createLojaDto: CreateLojaDto) {
    return await this.lojaService.create(createLojaDto);
  }

  @UseGuards(AuthGuard('oauth2'))
  @Get()
  async findAll() {
    return await this.lojaService.findAll();
  }

  @UseGuards(AuthGuard('oauth2'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.lojaService.findOne(+id);
  }

  @UseGuards(AuthGuard('oauth2'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return await this.lojaService.update(+id, updateLojaDto);
  }

  @UseGuards(AuthGuard('oauth2'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.lojaService.remove(+id);
  }
}