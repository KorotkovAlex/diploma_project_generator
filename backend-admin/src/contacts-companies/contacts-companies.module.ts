import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactCompany } from './contacts-company.entity';
import { ContactsCompaniesService } from './contacts-companies.service';
import { ContactsCompaniesController } from './contacts-companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactCompany])],
  providers: [ContactsCompaniesService],
  exports: [ContactsCompaniesService],
  controllers: [ContactsCompaniesController],
})
export class ContactsCompaniesModule {}
