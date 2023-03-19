import { IsUUID } from 'class-validator';

export class GetMediaByIdDto {
  @IsUUID()
  id: string;
}
