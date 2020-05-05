import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import intoStream from 'into-stream';
import * as copydir from 'copy-dir';

const promisify = util.promisify;
const rmdirPromise = promisify(fs.rmdir);
const mkdirPromise = promisify(fs.mkdir);

const readdirPromise = promisify(fs.readdir);
const statPromise = promisify(fs.stat);
const unlinkPromise = promisify(fs.unlink);

export const unlinkIfExist = async (src: string) => {
  try {
    await unlinkPromise(src);
  } catch (err) {
    if (!['ENOENT'].includes(err.code)) {
      throw err;
    }
  }
};

export const rmdirIfExist = async (src: string) => {
  if (!src) {
    return;
  }

  const rmEmptyDir = async (src: string) => {
    try {
      await rmdirPromise(src);
    } catch (err) {
      if (!['ENOENT', 'ENOTDIR', 'ENOTEMPTY', 'EEXIST'].includes(err.code)) {
        throw err;
      }
    }
  };

  const filesAndDirsInsideDir = await readdirPromise(src);

  for (let i = 0; i < filesAndDirsInsideDir.length; i++) {
    let fileOrDirSrc = path.join(src, filesAndDirsInsideDir[i]);
    if ((await statPromise(fileOrDirSrc)).isDirectory()) {
      await rmdirIfExist(fileOrDirSrc);
    } else {
      await unlinkIfExist(fileOrDirSrc);
    }
  }
  await rmEmptyDir(src);
};

export const mkdirIfNotExist = async (dir: string) => {
  const mkdirInsideExistDirIfNotExist = async dir => {
    try {
      await mkdirPromise(dir);
    } catch (err) {
      if (!['EEXIST', 'EISDIR'].includes(err.code)) {
        throw err;
      }
    }
  };
  const splitedDir = dir.split(path.sep);
  let currentDir = path.join(path.parse(dir).root, splitedDir[0]);
  for (var i = 1; i < splitedDir.length; i++) {
    currentDir = path.join(currentDir, splitedDir[i]);
    await mkdirInsideExistDirIfNotExist(currentDir);
  }
};

export const writeStreamToFile = (stream: any, dest: string): Promise<any> =>
  new Promise((resolve, reject) => {
    const destStream = fs.createWriteStream(dest);
    stream
      .on('end', () => {
        destStream.end();
      })
      .on('error', err => {
        reject(err);
        destStream.end();
      })
      .pipe(destStream);
    destStream.on('finish', resolve);
  });

export const getStreamFromBuffer = async (buffer: Buffer): Promise<any> => {
  return intoStream(buffer);
};

export const copyFolder = async (from, to, callback) => {
  copydir(from, to, callback);
};
