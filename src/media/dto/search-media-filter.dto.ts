import { IsString } from 'class-validator';

export class SearchMediaFilterDto {
  @IsString()
  query: string;
}
