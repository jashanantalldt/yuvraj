import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'Movie Name', example: 'XYZ' })
  movieName: string;

  @ApiProperty({ description: 'Description', example: 'description' })
  description?: string;

  @ApiProperty({ description: 'Image url', example: 'https://xyz.com' })
  imageUrl?: string;
}

export class RemoveMovieDto {
  @ApiProperty({
    description: 'Movie Id',
    example: 'cfe1f856-2500-494c-ae72-ce96f292f19e',
  })
  movieId: string;
}

export class AddCommentsDto {
  @ApiProperty({ description: 'Comment', example: 'The test' })
  comment: string;

  @ApiProperty({
    description: 'user id',
    example: 'cfe1f856-2500-494c-ae72-ce96f292f19e',
  })
  commentedById?: string;

  @ApiProperty({
    description: 'Movie Id',
    example: 'cfe1f856-2500-494c-ae72-ce96f292fhhd',
  })
  movieId?: string;
}

export class RemoveCommentDto {
  @ApiProperty({
    description: 'Comment Id',
    example: 'cfe1f856-2500-494c-ae72-ce96f292f19e',
  })
  commentId: string;
}

export class GetMovieByIdDto {
  @ApiProperty({
    description: 'Movie Id',
    example: 'cfe1f856-2500-494c-ae72-ce96f292f19e',
  })
  movieId: string;
}
