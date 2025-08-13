import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { LojaService } from 'src/loja/loja.service';
import { FornecedorService } from '../fornecedor/fornecedor.service';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private lojaService: LojaService,
    private fornecedorService: FornecedorService,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const loja = await this.lojaService.findOne(createProdutoDto.lojaId);
    const fornecedor = await this.fornecedorService.findOne(
      createProdutoDto.fornecedorId,
    );
    if (!fornecedor) throw new NotFoundException('Fornecedor não encontrado');
    const produto = this.produtoRepository.create({
      ...createProdutoDto,
      loja,
      fornecedor,
    });
    return this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async findOne(id: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id: id },
    });
    if (!produto) throw new NotFoundException('Usuário não encontrado');
    return produto;
  }

  async update(
    id: string,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    let fornecedor: Fornecedor | null = null;
    if (updateProdutoDto.fornecedorId) {
      fornecedor = await this.fornecedorService.findOne(
        updateProdutoDto.fornecedorId,
      );
      if (!fornecedor) throw new NotFoundException('Fornecedor não encontrado');
    }
    await this.produtoRepository.update(id, {
      ...updateProdutoDto,
      ...(fornecedor ? { fornecedor } : {}),
    });
    return await this.findOne(id);
  }

  async remove(id: string) {
    const produto = await this.produtoRepository.delete(id);
    if (produto.affected === 0)
      throw new NotFoundException('Produto não encontrado');
  }
}
