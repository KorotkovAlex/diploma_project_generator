import { customAlphabet } from 'nanoid';

export const generateS3Id = () => {
  const alphabet =
    '_-0123456789' +
    'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const nanoid = customAlphabet(alphabet, 10);

  return nanoid();
};
