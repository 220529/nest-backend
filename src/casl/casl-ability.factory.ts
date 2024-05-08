import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Action } from './action.enum';
import { UserEnum } from '@/user/dto/user.enum';
import { User } from '@/user/schemas/user.schema';

@Injectable()
export class AbilityService {
  defineUserAbilities(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.role === UserEnum.Admin) {
      can(Action.Manage, 'all');
    } else {
      // 可编辑的字段
      const UserEditableFields = ['password', 'nickName', 'portrait'];
      can(Action.Update, 'User', UserEditableFields, { _id: user._id });
      can(Action.Delete, 'User', { _id: user._id });

      // 用户只能编辑自己的作品
      can(Action.Update, 'Template', { userId: user._id });
      can(Action.Delete, 'Template', { userId: user._id });
    }

    return build();
  }
}
