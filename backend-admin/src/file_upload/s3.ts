import * as generate from 'nanoid/generate';

export const generateS3Id = () => {
  const alphabet =
    '_-0123456789' +
    'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return generate(alphabet, 10);
};
