import { Module, Global } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';
import { FilesService } from '../files/files.service';
import { FilesModule } from '../files/files.module';

@Global()
@Module({
  imports: [
    MulterModule.register({
      dest: '/upload',
    }),
    FilesModule,
  ],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class ImageUploadModule {}
