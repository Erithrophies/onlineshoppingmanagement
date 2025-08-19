// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service'; // Keep this import
import { User } from '../user/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_secret_key',
    });
  }

  async validate(payload: any): Promise<User> {
    const { sub: id } = payload;
    const user = await this.userService.findOneById(id);
     console.log('User object from JWTStrategy:', user);
    console.log('Is user an admin?', user?.admin);
    console.log('Is user a customer?', user?.customer);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}