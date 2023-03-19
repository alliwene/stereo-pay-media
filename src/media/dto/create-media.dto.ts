import { MediaType } from './../enums/media-type.enum';
import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMediaDto {
  /**
   * Media type: audio or image
   */
  @IsEnum(MediaType)
  type: MediaType;

  /**
   * Media title
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Media description
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Media hhtp url
   */
  @IsUrl()
  url: string;
}
