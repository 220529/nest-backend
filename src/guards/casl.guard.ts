import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Method } from '@/casl/action.enum';
import { pick, isEmpty } from 'lodash';
import { permittedFieldsOf } from '@casl/ability/extra';
import { AbilityService } from '@/casl/casl-ability.factory';
import { UserService } from '@/user/user.service';
import { TemplateService } from '@/template/template.service';
import { IS_UNLIMITED_KEY } from '@/decorators/unlimited.decorator';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityService: AbilityService,
    private userService: UserService,
    private TemplateService: TemplateService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isUnlimited = this.reflector.getAllAndOverride<boolean>(
      IS_UNLIMITED_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isUnlimited) {
      // 💡 查看此条件
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { method, user, params, body } = request;

    // 校验登录用户的操作权限
    if (user) {
      const actionName = Method[method];
      // 获取当前处理器的类
      const handlerClass = context.getClass();
      const mongoName = handlerClass.name.replace('Controller', '');
      const serviceName = mongoName.toLocaleLowerCase() + 'Service';

      // 获取用户权限配置
      const ability = this.abilityService.defineUserAbilities(user);
      const rule = ability.relevantRuleFor(actionName, mongoName);

      if (rule) {
        if (rule.conditions) {
          const record = await this[serviceName].findOne(params.id);
          const permission = ability.can(actionName, record);
          if (!permission) {
            throw new UnauthorizedException('没有操作权限');
          }
        }
        if (rule.fields) {
          const editableFields = permittedFieldsOf(
            ability,
            actionName,
            mongoName,
            {
              fieldsFrom: (rule) => rule.fields || [],
            },
          );
          const fields = pick(body, editableFields);
          if (isEmpty(fields)) {
            throw new UnauthorizedException('没有可操作的字段');
          }
        }
      }
    }

    return true;
  }
}
