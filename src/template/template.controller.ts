import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorators/public.decorator';
// import { Public } from '@/decorators/public.decorator';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Template } from './schemas/template.schema';

@ApiTags('template')
@Controller('template')
@Public()
export class TemplateController {
  constructor(private readonly TemplateService: TemplateService) {}

  @Get()
  async findAll(): Promise<Template[]> {
    return this.TemplateService.findAll();
  }

  @Post()
  create(@Body() CreateTemplateDto: CreateTemplateDto): Promise<Template> {
    return this.TemplateService.create(CreateTemplateDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateTemplateDto: UpdateTemplateDto,
  ): Promise<Template> {
    return this.TemplateService.update(id, UpdateTemplateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Template> {
    return this.TemplateService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Template> {
    return this.TemplateService.remove(id);
  }
}
