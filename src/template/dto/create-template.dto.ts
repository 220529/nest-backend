import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';

enum TemplateType {
  Project = 'project',
  Component = 'component',
}

export class CreateTemplateDto {
  @ApiProperty() // 模板名称
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty() // 包路径
  @IsString()
  @IsNotEmpty()
  readonly pkgPath: string;

  @ApiProperty({ enum: TemplateType }) // 模板类型（项目模板或组件模板）
  @IsEnum(TemplateType)
  readonly pkgType: TemplateType;

  @ApiProperty() // 包名称（仅适用于项目模板）
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly pkgName: string;

  @ApiProperty() // 包版本（仅适用于项目模板）
  @IsString()
  @IsOptional()
  readonly pkgVersion?: string;

  @ApiProperty({ type: [String], required: false }) // 忽略的文件或目录列表（仅适用于项目模板）
  @IsArray()
  @IsOptional()
  readonly ignore?: string[];

  @ApiProperty({ type: [String], required: false }) // 标签（用于分类或标记模板）
  @IsArray()
  @IsOptional()
  readonly tags?: string[];

  @ApiProperty() // 安装说明（仅适用于项目模板）
  @IsString()
  @IsOptional()
  readonly installCommand?: string;

  @ApiProperty() // 启动说明（仅适用于项目模板）
  @IsString()
  @IsOptional()
  readonly startCommand?: string;

  @ApiProperty() // 构建路径（仅适用于项目模板）
  @IsString()
  @IsOptional()
  readonly buildPath?: string;

  @ApiProperty() // 构建路径（仅适用于项目模板）
  @IsString()
  @IsOptional()
  readonly entryPath?: string;
}
