// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // To access JWT_SECRET from .env
import { AuthService } from './auth.service';

export interface JwtPayload {
  sub: string; // User ID
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header (Bearer <token>)
      ignoreExpiration: false, // Do not ignore token expiration
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use JWT_SECRET from .env
    });
  }

  /**
   * Validates the JWT payload and returns the user.
   * This method is called after the JWT has been successfully verified.
   * @param payload - The decoded JWT payload.
   * @returns The user object.
   */
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token: User not found');
    }
    return user;
  }
}