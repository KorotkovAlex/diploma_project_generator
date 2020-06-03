import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Project } from './project.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { User } from 'src/users/user.entity';
import { setQueues } from 'bull-board';

@Injectable()
export class ProjectsService extends TypeOrmCrudService<Project> {
  constructor(
    @InjectQueue('gen-mobile-apps') private readonly projectQueue: Queue,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super(projectRepository);

    setQueues([projectQueue]);
  }

  public findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  public createProject({ project }) {
    const job = this.projectQueue
      .add({
        project,
      })
      .catch((error) => {
        console.log('error', error);
      });

    return job;
  }

  public async generateProject(params: {
    project: Project;
    currentUser: User;
  }) {
    const job = this.projectQueue
      .add('generate', { project: params.project, user: params.currentUser })
      .catch((error) => {
        console.log('error', error);
      });

    return job;
  }
}
