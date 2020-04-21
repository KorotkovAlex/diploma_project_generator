import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { FileUploadService } from './file_upload.service';
import { ImageUploadModule } from './file_upload.module';

describe('AuthService', () => {
  let app: INestApplication;
  let fileUploadService: FileUploadService;

  // beforeEach(() => {
  //   fileUploadService = new FileUploadService();
  // });

  // beforeAll(async () => {
  //   const module = await Test.createTestingModule({
  //     imports: [ImageUploadModule],
  //   })
  //     .overrideProvider(FileUploadService)
  //     .useValue(fileUploadService)
  //     .compile();

  //   app = module.createNestApplication();
  //   await app.init();
  // });

  // describe('DELETE /files', () => {
  //   it('should returns a error 404 file not found', async () => {
  //     await request(app.getHttpServer())
  //       .delete('/files?name_path=test')
  //       .set('Accept', 'application/json')
  //       .expect(404);
  //   });
  // });

  // it('should returns a error 400 file is required', async () => {
  //   await request(app.getHttpServer())
  //     .delete('/files')
  //     .set('Accept', 'application/json')
  //     .expect(400);
  // });

  // afterAll(async () => {
  //   await app.close();
  // });
});
