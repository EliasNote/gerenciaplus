import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fornecedor } from './entities/fornecedor.entity';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private readonly fornecedorRepository: Repository<Fornecedor>,
  ) {}

  async create(dto: CreateFornecedorDto): Promise<Fornecedor> {
    const fornecedor = this.fornecedorRepository.create(dto);
    return this.fornecedorRepository.save(fornecedor);
  }

  async findAll(): Promise<Fornecedor[]> {
    return this.fornecedorRepository.find({ relations: ['profile'] });
  }

  async findOne(id: string): Promise<Fornecedor | null> {
    return this.fornecedorRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async update(
    id: string,
    dto: UpdateFornecedorDto,
  ): Promise<Fornecedor | null> {
    await this.fornecedorRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.fornecedorRepository.delete(id);
  }
}
