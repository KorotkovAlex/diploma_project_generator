import { Test, TestingModule } from '@nestjs/testing';
import { AboutCompaniesService } from './about-companies.service';

describe('AboutCompaniesService', () => {
  let service: AboutCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutCompaniesService],
    }).compile();

    service = module.get<AboutCompaniesService>(AboutCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
