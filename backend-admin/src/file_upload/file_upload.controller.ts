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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    if (!file.mimetype.includes('image')) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This file is not a image',
        },
        403,
      );
    }

    try {
      const source = await this.fileUploadService.saveFileToLocalStorage2({
        file,
      });

      let dir = await resize(source.fullPath, source.folderName);

      dir = {
        ...dir,
        filePaths: {
          ...dir.filePaths,
          original: `${dir.path}/original.jpg`,
        },
      };

      const generatedPathName = generateS3Id();

      await this.fileUploadService.fileuploadByImagePath({
        source: dir,
        pathName: generatedPathName,
      });

      const uploadedFile = await this.filesService.saveFilePath({
        path: generatedPathName,
      });

      await rmdirIfExist(dir.path);

      return {
        status: HttpStatus.CREATED,
        path: generatedPathName,
        file: uploadedFile,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The File dose not upload',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete()
  async deleteFile(@Req() req: Request) {
    const { name_path: namePath } = req.query;

    if (!namePath) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Path name can't be empty",
      };
    }

    const result = await this.fileUploadService.deleteFile({
      namePath,
    });

    if (!result) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Files not found',
      };
    }

    await this.filesService.removeFilePath({
      path: namePath,
    });

    return {
      status: HttpStatus.OK,
      message: 'File has deleted',
    };
  }
}
