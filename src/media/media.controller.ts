import { SearchMediaFilterDto } from './dto/search-media-filter.dto';
import { UpdateMediaStatusDto } from './dto/update-media-status.dto';
import { GetMediaByIdDto } from './dto/get-media-by-id.dto';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaService } from './media.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Logger,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaPaginationDto } from './dto/media-pagination.dto';

@ApiTags('media')
@Controller('media')
export class MediaController {
  logger = new Logger('MediaController', { timestamp: true });
  constructor(private mediaService: MediaService) {}

  notFoundErrorMessage(id: string, res: Response, error: Error) {
    const errorMessage = `Media with ID ${id} not found`;
    this.logger.error(errorMessage);
    res.status(404).send({
      status: 'error',
      message: `${error.name}: ${errorMessage}`,
    });
  }

  @ApiOperation({
    description: 'Create a new media object',
  })
  @Post()
  async createMedia(
    @Body() createMediaDto: CreateMediaDto,
    @Res() res: Response,
  ) {
    const media = await this.mediaService.createMedia(createMediaDto);

    res.send({
      status: 'success',
      message: 'Media created successfully',
      data: media,
    });
  }

  @ApiOperation({
    description: 'Search media by title and description',
  })
  @Get('/search')
  async getMedia(
    @Query() filterDto: SearchMediaFilterDto,
    @Res() res: Response,
  ) {
    const media = await this.mediaService.searchMedia(filterDto);

    res.send({
      status: 'success',
      message: 'Media search sucessful',
      data: media,
    });
  }

  @ApiOperation({
    description: 'Fetch a single media by id',
  })
  @Get('/:id')
  async getMediaById(@Param() param: GetMediaByIdDto, @Res() res: Response) {
    try {
      const media = await this.mediaService.getMediaById(param.id);
      res.send({
        status: 'success',
        message: 'Media accessed successfully',
        data: media,
      });
    } catch (error) {
      this.notFoundErrorMessage(param.id, res, error);
    }
  }

  @ApiOperation({
    description: 'Update an existing media status by id',
  })
  @Patch(':id/status')
  async updateMediaStatus(
    @Param() param: GetMediaByIdDto,
    @Body() updateMediaStatusDto: UpdateMediaStatusDto,
    @Res() res: Response,
  ) {
    try {
      const { status } = updateMediaStatusDto;
      const media = await this.mediaService.updateMediaStatus(param.id, status);

      res.send({
        status: 'success',
        message: 'Media status updated successfully',
        data: media,
      });
    } catch (error) {
      const { status } = updateMediaStatusDto;
      if (error instanceof BadRequestException) {
        const errorMessage = `${error.name}: Media status is already ${status}`;
        this.logger.error(errorMessage);
        res.status(400).send({
          status: 'error',
          message: errorMessage,
        });
      } else {
        this.notFoundErrorMessage(param.id, res, error);
      }
    }
  }

  @ApiOperation({
    description: 'Soft delete a media item by id',
  })
  @Delete(':id')
  async deleteMediaById(@Param() param: GetMediaByIdDto, @Res() res: Response) {
    try {
      const media = await this.mediaService.getMediaById(param.id);
      await this.mediaService.deleteMedia(media);
      res.send({
        status: 'success',
        message: 'Media deleted successfully',
      });
    } catch (error) {
      this.notFoundErrorMessage(param.id, res, error);
    }
  }

  @ApiOperation({
    description: 'Fetch a paginated list of existing media objects',
  })
  @Get()
  async getPaginatedMedia(@Query() paginationDto: MediaPaginationDto) {
    const { page, perPage } = paginationDto;
    const media = await this.mediaService.getPaginatedMedia(page, perPage);

    return {
      status: 'success',
      message: 'Media list accessed successfully',
      data: media,
    };
  }
}
