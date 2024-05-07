import { Test, TestingModule } from '@nestjs/testing';
import { EoService } from './eo.service';

describe('EoService', () => {
  let service: EoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EoService],
    }).compile();

    service = module.get<EoService>(EoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
