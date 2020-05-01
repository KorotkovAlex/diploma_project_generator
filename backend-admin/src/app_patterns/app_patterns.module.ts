import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppPattern } from './app_patterns.entity';
import { AppPatternsController } from './app_patterns.controller';
import { AppPatternsService } from './app_patterns.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppPattern])],
  providers: [AppPatternsService],
  exports: [AppPatternsService],
  controllers: [AppPatternsController],
})
export class AppPatternsModule {}
