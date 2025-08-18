import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}



// auth.service.ts
async validateUser(username: string, pass: string): Promise<any> {
  const user = await this.userService.findOneByUsername(username);
  if (!user) {
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
  
  // Add this check to ensure password comparison works
  if (!user.passwordHash) {
    throw new HttpException('Invalid user configuration', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  
  const isMatch = await bcrypt.compare(pass, user.passwordHash);
  if (!isMatch) {
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
  
  // Return the user WITH role information
  return {
    id: user.id,
    username: user.username,
    role: user.role
  };
}

// auth.service.ts
async login(loginDto: LoginDto) {
  const user = await this.validateUser(loginDto.username, loginDto.password);
  
  const payload = { 
    username: user.username,
    sub: user.id,
    role: user.role // Ensure role is included
  };
  
  return {
    access_token: this.jwtService.sign(payload),
  };
}
}






























// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
// import { LoginDto } from './auth.dto';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.userService.findOneByUsername(username);
//     if (!user) {
//       throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
//     }
//     const isMatch = await bcrypt.compare(pass, user.passwordHash);
//     if (!isMatch) {
//       throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
//     }
//     const { passwordHash, ...result } = user;
//     return result;
//   }

// // auth.service.ts
// async login(loginDto: LoginDto) {
//   const user = await this.validateUser(loginDto.username, loginDto.password);
  
//   // Include role in payload
//   const payload = { 
//     username: user.username, 
//     sub: user.id,
//     role: user.role // ✅ Added role
//   };
  
//   return {
//     access_token: this.jwtService.sign(payload),
//   };

//   }
// }