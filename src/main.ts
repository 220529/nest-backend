import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/filter/http-exception.filter';
import { TransformInterceptor } from '@/global/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局路由前缀
  app.setGlobalPrefix('v1');

  const options = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
