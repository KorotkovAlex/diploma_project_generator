import { Processor, Process, OnQueueActive, OnQueueError } from '@nestjs/bull';
import { Job } from 'bull';

import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Processor('gen-mobile-apps')
export class ProjectsConsumer {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  @Process()
  async transcode(job: Job<{ project: Project }>) {
    console.log('transcode', job.data.project);
    this.projectRepository.save(job.data.project);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueError()
  onError(error: Error) {
    console.log('error', error);
  }
}
