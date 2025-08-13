import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,
  ) {}

  async create(createLojaDto: CreateLojaDto): Promise<Loja> {
    const loja = this.lojaRepository.create(createLojaDto);
    return await this.lojaRepository.save(loja);
  }

  async findAll(): Promise<Loja[]> {
    return await this.lojaRepository.find();
  }

  async findOne(id: string): Promise<Loja> {
    const loja = await this.lojaRepository.findOneBy({ id });
    if (!loja) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada`);
    }
    return loja;
  }

  async update(id: string, updateLojaDto: UpdateLojaDto): Promise<Loja> {
    await this.lojaRepository.update(id, updateLojaDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.lojaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada`);
    }
  }
}
