import { Test, TestingModule } from '@nestjs/testing';
import { ContactsCompaniesService } from './contacts-companies.service';

describe('ContactsCompaniesService', () => {
  let service: ContactsCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsCompaniesService],
    }).compile();

    service = module.get<ContactsCompaniesService>(ContactsCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
