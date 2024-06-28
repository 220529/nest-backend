import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OSS from 'ali-oss';

@Injectable()
export class OssService {
  private readonly ossClient: OSS;

  constructor(private configService: ConfigService) {
    // 从配置文件中读取访问密钥和其他配置
    const accessKeyId = this.configService.get<string>('ACCESS_KEY_ID');
    const accessKeySecret = this.configService.get<string>('ACCESS_KEY_SECRET');
    const bucket = this.configService.get<string>('OSS_BUCKET');
    const region = this.configService.get<string>('OSS_REGION');

    // 初始化OSS客户端
    this.ossClient = new OSS({
      accessKeyId,
      accessKeySecret,
      bucket,
      region,
    });
  }

  async upload(file: Express.Multer.File) {
    const { originalname, mimetype, buffer } = file;
    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(mimetype)) {
      throw new BadRequestException('只允许上传 JPEG、PNG 或 GIF 图像文件');
    }

    // 检查文件大小
    const size = 0.5;
    const maxSizeBytes = size * 1024 * 1024;
    if (buffer.length > maxSizeBytes) {
      throw new BadRequestException(
        `文件大小超过限制，请上传不超过${size}MB的文件`,
      );
    }
    const fileName = `${Date.now()}-${originalname}`;
    // 上传文件到OSS
    const result = await this.ossClient.put(fileName, buffer);
    // 返回文件的URL
    return {
      fileName: fileName,
      url: result.url,
    };
  }

  async multipleUpload(files: Express.Multer.File[]) {
    if (!files?.length) {
      throw new BadRequestException('文件不能为空');
    }
    if (files.length === 1) {
      return await this.upload(files[0]);
    }
    return await Promise.all(files.map((file) => this.upload(file)));
  }
}
