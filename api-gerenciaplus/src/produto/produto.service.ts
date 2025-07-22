import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { LojaService } from 'src/loja/loja.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private lojaService: LojaService,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const loja = await this.lojaService.findOne(createProdutoDto.lojaId);
    const produto = await this.produtoRepository.save({
      ...createProdutoDto,
      loja,
    });
    return produto;
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id: id },
    });
    if (!produto) throw new NotFoundException('Usuário não encontrado');
    return produto;
  }

  async update(
    id: number,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    await this.produtoRepository.update(id, updateProdutoDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const produto = await this.produtoRepository.delete(id);
    if (produto.affected === 0)
      throw new NotFoundException('Usuário não encontrado');
  }
}
