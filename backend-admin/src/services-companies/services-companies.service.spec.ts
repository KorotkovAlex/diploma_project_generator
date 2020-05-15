import { Test, TestingModule } from '@nestjs/testing';
import { ServicesCompaniesService } from './services-companies.service';

describe('ServicesCompaniesService', () => {
  let service: ServicesCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesCompaniesService],
    }).compile();

    service = module.get<ServicesCompaniesService>(ServicesCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
