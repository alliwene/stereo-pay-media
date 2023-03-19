import { Media } from './media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaRepository } from './media.repository';
import { MediaStatus } from './enums/media-status.enum';
import { SearchMediaFilterDto } from './dto/search-media-filter.dto';

@Injectable()
export class MediaService {
  logger = new Logger('MediaService', { timestamp: true });
  constructor(
    @InjectRepository(MediaRepository) private mediaRepository: MediaRepository,
  ) {}

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    return this.mediaRepository.createMedia(createMediaDto);
  }

  async getMediaById(id: string): Promise<Media> {
    const media = await this.mediaRepository.findOneOrFail({
      where: { id: id },
    });

    return media;
  }

  async deleteMedia(media: Media): Promise<void> {
    await this.mediaRepository.softRemove(media);
  }

  async updateMediaStatus(id: string, status: MediaStatus): Promise<Media> {
    const media = await this.getMediaById(id);

    if (media.status === status) {
      throw new BadRequestException(`Media status is already "${status}"`);
    }

    media.status = status;
    await this.mediaRepository.save(media);

    return media;
  }

  async searchMedia(filterDto: SearchMediaFilterDto) {
    const { query } = filterDto;
    const media = await this.mediaRepository
      .createQueryBuilder('media')
      .where(
        'LOWER(media.title) LIKE LOWER(:query) OR LOWER(media.description) LIKE LOWER(:query)',
        {
          query: `%${query}%`,
        },
      )
      .getMany();

    return media;
  }

  async getPaginatedMedia(page: number, perPage: number) {
    const [media, count] = await this.mediaRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const totalPages = Math.ceil(count / perPage);

    return {
      page,
      perPage,
      totalItems: count,
      totalPages,
      data: media,
    };
  }
}
