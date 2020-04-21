import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Get,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';
import resize from './resize';
import { rmdirIfExist } from './utilities';
import { Request } from 'express';
import { FilesService } from '../files/files.service';
import { generateS3Id } from './s3';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/user.decorator';
import { User } from '../users/user.entity';

@Controller('files')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly filesService: FilesService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  generateMobileApps(@CurrentUser() currentUser: User, @Req() req: any) {
    this.fileUploadService.generateMobileApp({
      user: currentUser,
      project: req.data,
    });
  }
}
