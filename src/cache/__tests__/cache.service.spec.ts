import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<CacheService>(CacheService);
    cacheManager = module.get<Cache>(CACHE_MANAGER); // Definindo o tipo de cacheManager explicitamente como Cache
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data from cache if available', async () => {
    const cachedData = { test: 'cached data' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedData);

    const user = await service.getCache('key', () => Promise.resolve({}));
    expect(user).toEqual(cachedData);
  });

  it('should return data from function and set to cache if not available', async () => {
    const result = { test: 'test' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined);

    const user = await service.getCache('key', () => Promise.resolve(result));
    expect(user).toEqual(result);
    expect(cacheManager.set).toHaveBeenCalledWith('key', result);
  });
});
