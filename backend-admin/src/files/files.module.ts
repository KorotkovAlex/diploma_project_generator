import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesService } from './files.service';
import { Files } from './files.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
