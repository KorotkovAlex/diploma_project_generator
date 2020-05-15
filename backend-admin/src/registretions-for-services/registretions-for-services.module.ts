import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { RegistretionsForServicesService } from './registretions-for-services.service';
import { RegistretionsForServicesController } from './registretions-for-services.controller';
import { RegistretionForService } from './registretions-for-services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistretionForService])],
  providers: [RegistretionsForServicesService],
  exports: [RegistretionsForServicesService],
  controllers: [RegistretionsForServicesController],
})
export class RegistretionsForServicesModule {}
