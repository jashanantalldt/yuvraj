import { Injectable } from '@nestjs/common';
import { Movie, Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddCommentsDto,
  CreateMovieDto,
  GetMovieByIdDto,
  RemoveCommentDto,
  RemoveMovieDto,
} from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  async removeMovie(removeMovieDto: RemoveMovieDto): Promise<Movie> {
    return this.prisma.movie.update({
      where: {
        id: removeMovieDto.movieId,
      },
      data: {
        isDeletedMovie: true,
      },
    });
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: {
        isDeletedMovie: false,
      },
      select: {
        id: true,
        movieName: true,
        isDeletedMovie: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        comments: true,
      },
    });
  }

  async addComment(addCommentDto: AddCommentsDto): Promise<void> {
    const { comment, commentedById, movieId } = addCommentDto;

    await this.prisma.comment.create({
      data: {
        comment,
        commentedById,
        movieId,
      },
    });
  }

  async removeComment(removeCommentDto: RemoveCommentDto): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        id: removeCommentDto.commentId,
      },
      data: {
        isDeletedComment: true,
      },
    });
  }

  async getAllComment(): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        movie: {
          isDeletedMovie: false,
        },
        isDeletedComment: false,
      },
      include: {
        commentedBy: true,
        movie: true,
      },
    });
  }

  async getMovieById(getMovieById: GetMovieByIdDto): Promise<any> {
    return this.prisma.movie.findUnique({
      where: { id: getMovieById.movieId, isDeletedMovie: false },
      include: {
        comments: {
          include: {
            commentedBy: true,
          },
          where: {
            isDeletedComment: false,
          },
        },
      },
    });
  }
}
