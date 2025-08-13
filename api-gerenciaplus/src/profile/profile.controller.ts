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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from './entities/profile.entity';
import { ProfileResponseDto } from './dto/response-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.createProfileResponseDto(
      await this.profileService.create(createProfileDto),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProfileResponseDto> {
    return this.createProfileResponseDto(await this.profileService.findOne(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    return await this.profileService.update(id, updateProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.profileService.remove(id);
  }

  createProfileResponseDto(profile: Profile): ProfileResponseDto {
    return {
      id: profile.id,
      username: profile.username,
      nome: profile.nome,
      sobrenome: profile.sobrenome,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
