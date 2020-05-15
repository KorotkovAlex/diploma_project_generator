import { Module } from '@nestjs/common';
import { AboutCompany } from './about-company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutCompaniesService } from './about-companies.service';
import { AboutCompaniesController } from './about-companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AboutCompany])],
  providers: [AboutCompaniesService],
  exports: [AboutCompaniesService],
  controllers: [AboutCompaniesController],
})
export class AboutCompaniesModule {}
