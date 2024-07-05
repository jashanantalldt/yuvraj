import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  AddCommentsDto,
  CreateMovieDto,
  GetMovieByIdDto,
  RemoveCommentDto,
  RemoveMovieDto,
} from './dto/movie.dto';
import { ApiBody, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('movie/v1/')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/add')
  @ApiOperation({ summary: 'Create Movie' })
  @ApiBody({ description: 'Movie Info', type: CreateMovieDto }) // Example DTO for the request body
  @ApiResponse({ status: 200, description: 'Movie Added succefully' })
  async create(@Request() req) {
    try {
      const { movieName, description, image_url } = req.body;
      await this.movieService.createMovie({
        movieName,
        description,
        imageUrl: image_url,
      });
      return { message: 'Movie successfully added' };
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new Error('Internal server error');
    }
  }

  @Delete('/remove/')
  @ApiQuery({ description: 'Movie id', type: RemoveMovieDto })
  @ApiOperation({ summary: 'Remove Movie' })
  @ApiResponse({ status: 200, description: 'Movie delete successfully' })
  async remove(@Request() req) {
    try {
      await this.movieService.removeMovie(req?.query);
      return { message: 'Movie successfully removed' };
    } catch (error) {
      console.error('Error removing movie:', error);
      throw new Error('Internal server error');
    }
  }

  @Get('/get-movie')
  @ApiOperation({ summary: 'Get all movie' })
  @ApiResponse({ status: 200, description: 'Movie get successfully' })
  async getAllMovie() {
    try {
      const movies = await this.movieService.getAllMovies();
      return { data: movies };
    } catch (error) {
      console.error('Error removing movie:', error);
      throw new Error('Internal server error');
    }
  }

  @Post('/add-comment')
  @ApiOperation({ summary: 'Add Comment' })
  @ApiBody({ description: 'Comment Detail', type: AddCommentsDto }) // Example DTO for the request body
  @ApiResponse({ status: 200, description: 'Comment Added succefully' })
  async addComments(@Request() req) {
    try {
      const { comment, commentedById, movieId } = req.body;
      await this.movieService.addComment({
        comment,
        commentedById,
        movieId,
      });
      return { message: 'Comment successfully added' };
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new Error('Internal server error');
    }
  }

  @Delete('/remove-comment/')
  @ApiQuery({ description: 'Comment id', type: RemoveCommentDto })
  @ApiOperation({ summary: 'Remove Comment operation' })
  @ApiResponse({ status: 200, description: 'Comment remove successfully' })
  async removeCommentById(@Request() req) {
    try {
      await this.movieService.removeComment(req?.query);
      return { message: 'Comment successfully removed' };
    } catch (error) {
      console.error('Error removing movie:', error);
      throw new Error('Internal server error');
    }
  }

  @Get('/get-comments')
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'Comments get successfully' })
  async getAllComments() {
    try {
      const comment = await this.movieService.getAllComment();
      return { data: comment };
    } catch (error) {
      console.error('Error removing movie:', error);
      throw new Error('Internal server error');
    }
  }

  @Get('/get-movie-id/')
  @ApiQuery({ description: 'Get movie by id', type: GetMovieByIdDto })
  @ApiOperation({ summary: 'Movie getting by id operation' })
  @ApiResponse({ status: 200, description: 'Movie getting successfully' })
  async getMovieById(@Request() req) {
    try {
      const movie = await this.movieService.getMovieById(req?.query);
      return { data: movie };
    } catch (error) {
      console.error('Error removing movie:', error);
      throw new Error('Internal server error');
    }
  }
}
