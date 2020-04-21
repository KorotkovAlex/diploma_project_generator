import * as path from 'path';
import * as os from 'os';

import { mkdirIfNotExist } from './utilities';

import { imageStyles } from './imageStyles';
import { resize as resizeWithCMD } from './graphicsmagick';

const _resizeOneImage = async (src, style, dest) =>
  resizeWithCMD({
    src,
    destPath: dest,
    width: style.size.width,
    height: style.size.height,
    quality: style.quality,
    strip: style.base64,
    filter: style.filter,
  });

const _resizeImages = async (src, imageStyles, destPath) => {
  const resized = {};

  const imageStylesKeys = Object.keys(imageStyles);

  for (let index = 0; index < imageStylesKeys.length; ++index) {
    const keyName = imageStylesKeys[index];
    const style = imageStyles[keyName];
    const dest = path.join(destPath, keyName + style.extensions[0]);
    resized[keyName] = dest;

    await _resizeOneImage(src, style, dest);
  }

  return resized;
};

const resize = async (src: string, folderName: string) => {
  const destPath = path.join(os.tmpdir(), 'idk', folderName);
  await mkdirIfNotExist(destPath);
  const filePaths = await _resizeImages(src, imageStyles, destPath);

  return { path: destPath, filePaths };
};

export default resize;
