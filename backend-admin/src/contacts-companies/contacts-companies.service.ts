import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContactCompany } from './contacts-company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsCompaniesService extends TypeOrmCrudService<
  ContactCompany
> {
  constructor(
    @InjectRepository(ContactCompany)
    private readonly contactCompanyRepository: Repository<ContactCompany>,
  ) {
    super(contactCompanyRepository);
  }
}
