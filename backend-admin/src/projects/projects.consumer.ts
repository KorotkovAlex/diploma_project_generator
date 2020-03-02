import { Processor, Process, OnQueueActive, OnQueueError } from '@nestjs/bull';
import { Job } from 'bull';

import { Project } from './project.entity';

@Processor('gen-mobile-apps')
export class ProjectsConsumer {
  constructor() {}

  @Process()
  async transcode(job: Job<{ project: Project }>) {
    console.log('transcode');
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
