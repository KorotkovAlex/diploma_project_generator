import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AboutCompany } from './about-company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AboutCompaniesService extends TypeOrmCrudService<AboutCompany> {
  constructor(
    @InjectRepository(AboutCompany)
    private readonly aboutCompanyRepository: Repository<AboutCompany>,
  ) {
    super(aboutCompanyRepository);
  }
}
