import { Test, TestingModule } from '@nestjs/testing';
import { WsioGateway } from './wsio.gateway';
import { WsioService } from './wsio.service';

describe('WsioGateway', () => {
  let gateway: WsioGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsioGateway, WsioService],
    }).compile();

    gateway = module.get<WsioGateway>(WsioGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
