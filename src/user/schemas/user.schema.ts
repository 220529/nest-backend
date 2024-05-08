import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 定义用户模式
 * 未定义的字段，存不进去
 */
@Schema({ timestamps: true })
export class User extends Document {
  // 用户名
  @Prop()
  username: string;

  // 密码
  @Prop()
  password: string;

  // 电子邮件（可选）
  @Prop()
  email: string;

  // 昵称
  @Prop()
  nickName: string;

  // 角色
  @Prop()
  role: string;

  // 肖像
  @Prop()
  portrait: string;
}

// 创建 User 模型
export type UserDocument = User & Document;

// 创建用户模式
export const UserSchema = SchemaFactory.createForClass(User);
