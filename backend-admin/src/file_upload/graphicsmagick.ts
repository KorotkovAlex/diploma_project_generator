import { execFile } from 'child_process';

const _exec = (script: string, args) =>
  new Promise((resolve, reject) =>
    execFile(script, args, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      } else if (stderr) {
        return reject(new Error(stderr + 'out' + stdout));
      }
      resolve({ stdout, stderr });
    }),
  );

type GetSizeType = Promise<{ height: number; width: number }>;

export const getSize = async (path: string): GetSizeType => {
  const { stdout }: any = await _exec('gm', [
    'identify',
    '-format',
    '%w %h',
    path,
  ]);

  const [width, height] = stdout.split(' ').map(s => parseInt(s));
  return { width, height };
};

interface OptionsType {
  src: string;
  destPath: string;
  width: number;
  height: number;
  quality?: number;
  strip: boolean;
  format?: string;
  filter?: string;
}

export const resize = async (options: OptionsType): Promise<void> => {
  const shape = `${options.width}x${options.height}`;

  const args = ['convert', options.src, '-auto-orient'];

  if (options.width < 100 || options.strip) {
    // if image is small, we strip color profile too.
    args.push('-strip');
  } else {
    // This will strip all metadata except color profile (P3)
    args.push('+profile', '!icm,*');
  }

  args.push(
    '-thumbnail',
    `${shape}^`,
    '-gravity',
    'center',
    '-crop',
    `${shape}+0+0!`,
    '+repage',
  );

  if (options.quality) {
    args.push('-quality', `${options.quality}`);
  }

  if (options.filter) {
    args.push('-filter', options.filter);
  }

  args.push(options.destPath);

  await _exec('gm', args);
};
