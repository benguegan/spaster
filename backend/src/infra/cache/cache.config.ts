import { CacheModuleOptions } from '@nestjs/cache-manager';

export const cacheConfig: CacheModuleOptions = {
  isGlobal: true,
  ttl: 5,
  max: 10,
};
