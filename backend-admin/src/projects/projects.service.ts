import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Project } from './project.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ProjectsService extends TypeOrmCrudService<Project> {
  constructor(
    @InjectQueue('gen-mobile-apps') private readonly projectQueue: Queue,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super(projectRepository);
  }

  public async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  public async createProject() {
    console.log('createProject');
    const project = new Project();

    const job = this.projectQueue
      .add({
        project,
      })
      .catch(error => {
        console.log('error', error);
      });

    console.log('job', job);
    return job;
  }
}
