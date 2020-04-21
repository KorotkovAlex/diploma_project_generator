import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Files } from './files.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
  ) {}

  public async saveFilePath({ path }): Promise<Files> {
    const file  = new Files();
    file.path = path;

    return await this.filesRepository.save(file);
  }

  public async removeFilePath({ path }): Promise<DeleteResult> {
    return await this.filesRepository.delete({ path });
  }

  public async findFileByPathName({path}): Promise<Files> {
    return await this.filesRepository.findOne(path);
  }
}
