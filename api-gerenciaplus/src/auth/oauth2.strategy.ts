import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri: configService.get<string>('KEYCLOAK_JWKS_URI')!,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
      }),
      audience: configService.get<string>('KEYCLOAK_AUDIENCE'),
      issuer: configService.get<string>('KEYCLOAK_ISSUER'),
      algorithms: [configService.get<string>('KEYCLOAK_ALGORITHM')],
    });
  }

  async validate(payload: any) {
    // Aqui você pode buscar/criar o usuário no seu banco, se quiser
    return payload;
  }
}