import { MediaStatus } from './../enums/media-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateMediaStatusDto {
  @IsEnum(MediaStatus)
  status: MediaStatus;
}
