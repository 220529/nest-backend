import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Template 文档模型
 */
@Schema({ timestamps: true })
export class Template extends Document {
  // 模板名称
  @Prop()
  name: string;

  // 包名称（仅适用于项目模板）
  @Prop()
  pkgName: string;

  // 包版本（仅适用于项目模板）
  @Prop()
  pkgVersion: string;

  // 模板类型（项目模板或组件模板）
  @Prop()
  pkgType: 'project' | 'component';

  // 包路径
  @Prop()
  pkgPath: string;

  // 忽略的文件或目录列表（仅适用于项目模板）
  @Prop()
  ignore: string[];

  // 需要被ejs处理的文件
  @Prop()
  ejsPaths: string[];

  // 标签（用于分类或标记模板）
  @Prop()
  tags: string[];

  // 安装说明（仅适用于项目模板）
  @Prop()
  installCommand: string;

  // 启动说明（仅适用于项目模板）
  @Prop()
  startCommand: string;

  // 构建路径（仅适用于项目模板）
  @Prop()
  buildPath: string;

  // 模版具体路径（仅适用于组件模板）
  @Prop()
  entryPath: string;
}

// Template 文档类型
export type TemplateDocument = Template & Document;

// Template 模式
export const TemplateSchema = SchemaFactory.createForClass(Template);
