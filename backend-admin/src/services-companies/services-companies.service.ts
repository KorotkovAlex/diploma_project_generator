import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ServicesCompany } from './services-company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesCompaniesService extends TypeOrmCrudService<
  ServicesCompany
> {
  constructor(
    @InjectRepository(ServicesCompany)
    private readonly aboutCompanyRepository: Repository<ServicesCompany>,
  ) {
    super(aboutCompanyRepository);
  }
}
