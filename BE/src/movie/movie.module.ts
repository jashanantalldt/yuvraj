import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  providers: [MovieService, PrismaService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
