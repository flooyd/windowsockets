import { Test, TestingModule } from '@nestjs/testing';
import { WsioService } from './wsio.service';

describe('WsioService', () => {
  let service: WsioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsioService],
    }).compile();

    service = module.get<WsioService>(WsioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
