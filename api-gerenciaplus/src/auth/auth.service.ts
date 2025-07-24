import { Injectable } from '@nestjs/common';
import KcAdminClient from 'keycloak-admin';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  private kcAdminClient: KcAdminClient;

  constructor(
  ) {
    this.kcAdminClient = new KcAdminClient({
      baseUrl: process.env.KEYCLOAK_URL,
      realmName: process.env.KEYCLOAK_REALM,
    });
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    await this.kcAdminClient.auth({
      grantType: 'client_credentials',
      clientId: process.env.KEYCLOAK_ADMIN_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET!,
    });

    await this.kcAdminClient.users.create({
      realm: process.env.KEYCLOAK_REALM,
      username: createUsuarioDto.email,
      email: createUsuarioDto.email,
      enabled: true,
      emailVerified: true,
      firstName: createUsuarioDto.nome,
      lastName: createUsuarioDto.sobreNome,
      credentials: [
        {
          type: 'password',
          value: createUsuarioDto.senha,
          temporary: false,
        },
      ],
    });
  }
}