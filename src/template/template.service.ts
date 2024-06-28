import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templateModel.find().select({ __v: 0 }).exec();
  }

  async findOne(id: string): Promise<Template> {
    return this.templateModel.findById(id).select({ __v: 0 }).exec();
  }

  async remove(id: string): Promise<Template> {
    return this.templateModel.findByIdAndDelete(id).select({ _id: 1 }).exec();
  }

  async update(
    id: string,
    UpdateTemplateDto: UpdateTemplateDto,
  ): Promise<Template> {
    return this.templateModel
      .findByIdAndUpdate(id, UpdateTemplateDto, {
        new: true,
      })
      .select({ __v: 0 })
      .exec();
  }

  async create(CreateTemplateDto: CreateTemplateDto): Promise<Template> {
    const createdTemplate = new this.templateModel(CreateTemplateDto);
    return createdTemplate.save();
  }
}
