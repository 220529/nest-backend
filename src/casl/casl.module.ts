import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CaslGuard } from '@/guards/casl.guard';
import { UserModule } from '@/user/user.module';
import { TemplateModule } from '@/template/template.module';
import { AbilityService } from './casl-ability.factory';

@Module({
  imports: [UserModule, TemplateModule],
  providers: [
    AbilityService,
    {
      provide: APP_GUARD,
      useClass: CaslGuard,
    },
  ],
})
export class CaslModule {}
