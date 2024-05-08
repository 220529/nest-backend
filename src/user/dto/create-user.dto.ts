import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsEmail,
  IsIn,
} from 'class-validator';
import { UserEnum } from './user.enum';

/**
 * 用户 创建 DTO，主要用于创建的数据传输对象
 * ApiProperty是给swagger用的，不用swagger，可忽略
 * 其余装饰器，用于控制器前的校验
 */
export class CreateUserDto {
  // 用户名
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 8, {
    message:
      'the name must be between $constraint1 and $constraint2 characters.',
  })
  readonly username: string;

  // 密码
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  // 邮箱（可选）
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;

  // 昵称
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly nickName: string;

  // 头像
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly portrait: string;

  // 角色，默认为'normal'
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn([UserEnum.Admin, UserEnum.Normal])
  readonly role: string;
}
