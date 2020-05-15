import { Test, TestingModule } from '@nestjs/testing';
import { AboutCompaniesController } from './about-companies.controller';

describe('AboutCompanies Controller', () => {
  let controller: AboutCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutCompaniesController],
    }).compile();

    controller = module.get<AboutCompaniesController>(AboutCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
