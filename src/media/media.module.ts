import { MediaRepository } from './media.repository';
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [],
  providers: [MediaService, MediaRepository],
  controllers: [MediaController],
})
export class MediaModule {}
