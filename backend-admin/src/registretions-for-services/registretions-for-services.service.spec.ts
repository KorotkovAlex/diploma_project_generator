import { Test, TestingModule } from '@nestjs/testing';
import { RegistretionsForServicesService } from './registretions-for-services.service';

describe('RegistretionsForServicesService', () => {
  let service: RegistretionsForServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistretionsForServicesService],
    }).compile();

    service = module.get<RegistretionsForServicesService>(RegistretionsForServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
