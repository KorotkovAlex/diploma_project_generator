import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesCompaniesService } from './services-companies.service';
import { ServicesCompaniesController } from './services-companies.controller';
import { ServicesCompany } from './services-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesCompany])],
  providers: [ServicesCompaniesService],
  exports: [ServicesCompaniesService],
  controllers: [ServicesCompaniesController],
})
export class ServicesCompaniesModule {}
