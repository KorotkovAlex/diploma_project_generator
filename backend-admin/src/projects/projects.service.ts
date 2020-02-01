import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  repository = null;

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  public async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }
}
