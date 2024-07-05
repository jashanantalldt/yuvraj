import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.email === 'admin@gmail.com' ? true : false,
    };
  }

  async signUp(
    email: string,
    password: string,
    userName: string,
  ): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return this.prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });
  }
}
