import { Test, TestingModule } from '@nestjs/testing';
import { ContactsCompaniesController } from './contacts-companies.controller';

describe('ContactsCompanies Controller', () => {
  let controller: ContactsCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsCompaniesController],
    }).compile();

    controller = module.get<ContactsCompaniesController>(ContactsCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
