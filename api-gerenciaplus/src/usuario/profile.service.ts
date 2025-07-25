import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { LojaService } from 'src/loja/loja.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/response-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private lojaService: LojaService,
  ) {}

  async create(
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileResponseDto> {
    const loja = await this.lojaService.findOne(createProfileDto.lojaId);
    const profile = this.profileRepository.create({
      ...createProfileDto,
      loja,
    });
    const profileSave = await this.profileRepository.save(profile);

    return this.createProfileResponseDto(profileSave);
  }

  async findOne(id: string): Promise<ProfileResponseDto> {
    const profile = await this.profileRepository.findOne({
      where: { id: id },
    });
    if (!profile) throw new NotFoundException('Perfil não encontrado');
    return this.createProfileResponseDto(profile);
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    await this.profileRepository.update(id, updateProfileDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.profileRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Perfil não encontrado');
  }

  createProfileResponseDto(profile: Profile): ProfileResponseDto {
    return {
      id: profile.id,
      username: profile.username,
      nome: profile.nome,
      sobrenome: profile.sobrenome,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    };
  }
}
