import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Public } from '@/decorators/public.decorator';
import { OssService } from './oss.service';

@Public()
@ApiTags('oss')
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.ossService.multipleUpload(files);
  }
}
