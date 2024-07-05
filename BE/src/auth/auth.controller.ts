// src/auth/auth.controller.ts

import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, UserSignupDto } from './dto/user-signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth/v1/')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ description: 'User credentials', type: LoginDto }) // Example DTO for the request body
  @ApiResponse({ status: 200, description: 'User Login successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ description: 'New user credentials', type: UserSignupDto }) // Example DTO for the request body
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async signUp(@Request() req) {
    const user = await this.prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    return this.authService.signUp(
      req.body.email,
      req.body.password,
      req.body.userName,
    );
  }
}
