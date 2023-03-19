import { MediaStatus } from './enums/media-status.enum';
import { CreateMediaDto } from './dto/create-media.dto';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaRepository extends Repository<Media> {
  private logger = new Logger('MediaRepository', { timestamp: true });
  constructor(private dataSource: DataSource) {
    super(Media, dataSource.createEntityManager());
  }

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const { type, title, description, url } = createMediaDto;

    const media = this.create({
      type: type,
      title: title,
      description: description,
      url: url,
      status: MediaStatus.Active,
    });

    await this.save(media);

    return media;
  }
}
