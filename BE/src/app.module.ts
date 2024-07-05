import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [AuthModule, MovieModule, PrismaModule],
})
export class AppModule {}
