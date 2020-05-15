import { Test, TestingModule } from '@nestjs/testing';
import { ServicesCompaniesController } from './services-companies.controller';

describe('ServicesCompanies Controller', () => {
  let controller: ServicesCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesCompaniesController],
    }).compile();

    controller = module.get<ServicesCompaniesController>(ServicesCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
