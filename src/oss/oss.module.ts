import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';

@Module({
  imports: [ConfigModule],
  controllers: [OssController],
  providers: [OssService],
})
export class OssModule {}
