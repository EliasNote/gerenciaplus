import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { LojaService } from 'src/loja/loja.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private lojaService: LojaService,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const loja = await this.lojaService.findOne(createProfileDto.lojaId);
    const profile = this.profileRepository.create({
      ...createProfileDto,
      loja,
    });
    const profileSave = await this.profileRepository.save(profile);

    return profileSave;
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['loja'],
    });
    if (!profile) throw new NotFoundException('Perfil não encontrado');
    return profile;
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    await this.profileRepository.update(id, updateProfileDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.profileRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Perfil não encontrado');
  }
}
