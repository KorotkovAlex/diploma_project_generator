import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { AppPattern } from './app_patterns.entity';

@Injectable()
export class AppPatternsService extends TypeOrmCrudService<AppPattern> {
  constructor(
    @InjectRepository(AppPattern)
    private readonly projectRepository: Repository<AppPattern>,
  ) {
    super(projectRepository);
  }

  public async findAll(): Promise<AppPattern[]> {
    return this.projectRepository.find();
  }
}
