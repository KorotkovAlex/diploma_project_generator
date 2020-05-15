import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RegistretionForService } from './registretions-for-services.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegistretionsForServicesService extends TypeOrmCrudService<
  RegistretionForService
> {
  constructor(
    @InjectRepository(RegistretionForService)
    private readonly registretionForServiceRepository: Repository<
      RegistretionForService
    >,
  ) {
    super(registretionForServiceRepository);
  }
}
