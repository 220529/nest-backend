import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@/auth/auth.module';
import { CaslModule } from '@/casl/casl.module';
import { UserModule } from '@/user/user.module';
import { TemplateModule } from '@/template/template.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUrl = `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}`;
        console.log('mongoUrl: ', mongoUrl);
        return {
          user: configService.get('MONGO_INITDB_ROOT_USERNAME'),
          pass: configService.get('MONGO_INITDB_ROOT_PASSWORD'),
          dbName: configService.get('MONGO_INITDB_DATABASE'),
          uri: mongoUrl,
        };
      },
    }),
    AuthModule,
    CaslModule,
    UserModule,
    TemplateModule,
  ],
})
export class AppModule {}
