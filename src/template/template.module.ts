import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Template, TemplateSchema } from './schemas/template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService], // 需要被其他模块使用的服务，必须要导出
})
export class TemplateModule {}
