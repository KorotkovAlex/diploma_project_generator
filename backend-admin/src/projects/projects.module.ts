import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ConfigService } from 'src/config/config.service';
import { BullModule } from '@nestjs/bull';
import { ProjectsConsumer } from './projects.consumer';
import { Files } from '../files/files.entity';

const BullModuleWithConfig = () => {
  const config = new ConfigService().getConfig();
  return BullModule.registerQueue({
    name: 'gen-mobile-apps',
    redis: {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    },
  });
};

@Module({
  imports: [BullModuleWithConfig(), TypeOrmModule.forFeature([Project, Files])],
  providers: [ProjectsService, ProjectsConsumer],
  exports: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
