import { SetMetadata } from '@nestjs/common';

export const IS_UNLIMITED_KEY = 'isUnlimited';
export const Unlimited = () => SetMetadata(IS_UNLIMITED_KEY, true);
