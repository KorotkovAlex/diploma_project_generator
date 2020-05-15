import { Test, TestingModule } from '@nestjs/testing';
import { RegistretionsForServicesController } from './registretions-for-services.controller';

describe('RegistretionsForServices Controller', () => {
  let controller: RegistretionsForServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistretionsForServicesController],
    }).compile();

    controller = module.get<RegistretionsForServicesController>(RegistretionsForServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
