import { Test, TestingModule } from '@nestjs/testing';
import { EoController } from './eo.controller';

describe('EoController', () => {
  let controller: EoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EoController],
    }).compile();

    controller = module.get<EoController>(EoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
