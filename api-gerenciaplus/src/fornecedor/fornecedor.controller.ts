import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ResponseFornecedorDto } from './dto/response-fornecedor.dto';
import { Fornecedor } from './entities/fornecedor.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('fornecedores')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  async create(
    @Body() dto: CreateFornecedorDto,
  ): Promise<ResponseFornecedorDto> {
    const fornecedor = await this.fornecedorService.create(dto);
    return this.toResponseDto(fornecedor);
  }

  @Get()
  async findAll(): Promise<ResponseFornecedorDto[]> {
    const fornecedores = await this.fornecedorService.findAll();
    return fornecedores.map((f) => this.toResponseDto(f));
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseFornecedorDto | null> {
    const fornecedor = await this.fornecedorService.findOne(id);
    return fornecedor ? this.toResponseDto(fornecedor) : null;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFornecedorDto,
  ): Promise<ResponseFornecedorDto | null> {
    const fornecedor = await this.fornecedorService.update(id, dto);
    return fornecedor ? this.toResponseDto(fornecedor) : null;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.fornecedorService.remove(id);
    return { deleted: true };
  }

  toResponseDto(fornecedor: Fornecedor): ResponseFornecedorDto {
    return {
      id: fornecedor.id,
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      createdAt: fornecedor.createdAt,
      updatedAt: fornecedor.updatedAt,
    };
  }
}
