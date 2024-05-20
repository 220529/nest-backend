import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { spawn } from 'child_process';
// import path from 'path';
// import { join } from 'path';
import * as path from 'path';

function execCommand(params) {
  const { cmd, args, options = { stdio: 'inherit' } } = params;
  return new Promise((resolve, reject) => {
    // 使用 spawn 执行命令
    const child = spawn(cmd, args, options);

    // 监听子进程的错误事件
    child.on('error', (data) => {
      reject(data);
    });

    // 监听子进程的退出事件
    child.on('exit', (code) => {
      resolve(code);
    });
  });
}

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

  async updateSa(query) {
    // 准备传递给 Python 脚本的数据
    execCommand({
      cmd: 'python3',
      args: [path.join(__dirname, 'insert.py'), query.plat, query.data],
      options: { stdio: 'inherit' },
    });
    return Promise.resolve({ cmd: 'python3', query });
  }
}
