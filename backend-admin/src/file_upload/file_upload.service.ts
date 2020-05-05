import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import unzipper from 'unzipper';

import { ConfigService } from '../config/config.service';
import { generateS3Id } from './s3';

import {
  getStreamFromBuffer,
  writeStreamToFile,
  mkdirIfNotExist,
} from './utilities';

import * as path from 'path';
import * as os from 'os';

const configService = new ConfigService();
const config = configService.getConfig();

const AWS_S3_BUCKET_NAME = config.AWS_S3_BUCKET_NAME;

const s3 = new AWS.S3({
  region: 'ru-msk',
  endpoint: 'http://hb.bizmrg.com',
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class FileUploadService {
  folderName = 'gen-mob-app';
  async unZipFile({ fileName }) {
    const destPath = path.join(os.tmpdir(), this.folderName, fileName);

    fs.createReadStream(destPath).pipe(
      unzipper.Extract({ path: path.join(os.tmpdir(), this.folderName) }),
    );

    return destPath;
  }

  async saveFileToLocalStorage({ file }) {
    const stream = await getStreamFromBuffer(file.buffer);
    const folderName = generateS3Id();

    const destPath = path.join(os.tmpdir(), this.folderName, folderName);
    await mkdirIfNotExist(destPath);

    const fullPath = `${destPath}/mobile-porject.zip`;
    await writeStreamToFile(stream, fullPath);

    return { fullPath, folderName };
  }

  async uploadFileToServe({ file }) {
    const params = {
      ACL: 'public-read',
      Bucket: AWS_S3_BUCKET_NAME,
      Key: `${file.name}`,
      Body: file.buffer,
    };

    const res = await s3.putObject(params).promise();

    return res;
  }

  async deleteFile({ namePath }) {
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Prefix: `${namePath}`,
    };

    const list = await s3.listObjects(params).promise();

    if (list.Contents.length === 0) {
      return null;
    }

    const objects = list.Contents.map(Content => ({ Key: Content.Key }));

    const paramsForDeleting = {
      Bucket: AWS_S3_BUCKET_NAME,
      Delete: { Objects: objects },
    };

    const res = await s3.deleteObjects(paramsForDeleting).promise();

    return res;
  }

  async download() {
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: config.AWS_ACCESS_KEY_ID,
    };
    const filePath = path.join(os.tmpdir(), this.folderName);

    s3.getObject(params, (err, data) => {
      if (err) console.error(err);
      fs.writeFileSync(filePath, data.Body.toString());
    });
  }
  async generateMobileApp({ user, project }) {
    // this.saveFileToLocalStorage({})
  }
}
