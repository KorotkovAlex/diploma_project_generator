import { Processor, Process, OnQueueActive, OnQueueError } from '@nestjs/bull';
import { exec } from 'child_process';
import { Job } from 'bull';
import { zip } from 'zip-a-folder';
import * as fs from 'fs';

import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { copyFolder, mkdirIfNotExist } from '../file_upload/utilities';
import { User } from '../users/user.entity';
import { generateS3Id } from '../file_upload/s3';
import { FileUploadService } from '../file_upload/file_upload.service';
import { Files } from '../files/files.entity';

@Processor('gen-mobile-apps')
export class ProjectsConsumer {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
  ) {}

  @Process()
  async transcode(job: Job<{ project: Project }>) {
    this.projectRepository.save(job.data.project);
  }

  @Process('generate')
  async generate(job: Job<{ project: Project; user: User }>) {
    const folderName = generateS3Id();
    const pathToFolder = `../app-patterns/client-projects/${folderName}`;
    await mkdirIfNotExist(pathToFolder);

    copyFolder(`../app-patterns/MobilePattern`, pathToFolder, result => {
      exec(
        `react-native-rename -n ${job.data.project.name} -p ${pathToFolder}`,
        async (error, stdout, stderr) => {
          const result = await zip(pathToFolder, `${pathToFolder}.zip`);

          fs.readFile(`${pathToFolder}.zip`, async (err, data) => {
            const fileUploadService = new FileUploadService();

            const path = await fileUploadService.uploadFileToServe({
              file: {
                name: `${folderName}.zip`,
                buffer: data,
              },
            });

            const project = job.data.project;

            const newFile = await this.filesRepository.save({
              path: folderName,
            });

            const saved = await this.projectRepository.save({
              ...project,
              projectPath: newFile,
            });
          });

          if (error) {
            console.log(`error: ${error.message}`);
            // return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            // return;
          }
          console.log(`stdout: ${stdout}`);
        },
      );
    });
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
