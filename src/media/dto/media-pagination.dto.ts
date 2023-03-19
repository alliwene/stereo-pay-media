import { IsInt, Min } from 'class-validator';

export class MediaPaginationDto {
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  perPage: number;
}
