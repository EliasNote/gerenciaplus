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
@UseGuards(AuthGuard('jwt'))
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  async create(@Body() createLojaDto: CreateLojaDto) {
    return await this.lojaService.create(createLojaDto);
  }

  @Get()
  async findAll() {
    return await this.lojaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.lojaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return await this.lojaService.update(+id, updateLojaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.lojaService.remove(+id);
  }
}
