
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (!user.passwordHash) {
      throw new HttpException('Invalid user configuration', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    
    return user;
  }

  async login(loginDto: LoginDto) {
    // validateUser now returns the full user entity
    const user = await this.validateUser(loginDto.username, loginDto.password);

    // Correct the variable type by explicitly defining it as 'string | null'
    let role: string | null = null;
    if (user.admin) {
      role = 'admin';
    } else if (user.seller) {
      role = 'seller';
    } else if (user.customer) {
      role = 'customer';
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: role // Include the determined role in the payload
    };

    return {
      access_token: this.jwtService.sign(payload),
      role: role,
    };
  }
}