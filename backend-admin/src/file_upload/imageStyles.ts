const ACL = {
  private: 'authenticated-read',
  public: 'public-read',
};

export const format = {
  JPEG: {
    format: 'JPEG',
    mimetype: 'image/jpeg',
    extensions: ['.jpg', '.jpeg'],
  },
};

export const originalStyle = {
  name: 'original',
  ACL: ACL.private,
  dbField: null,
  graphqlField: 'original',
};

export const imageStyles = {
  s1x1: {
    ...format.JPEG,
    size: { width: 80, height: 80 },
    quality: 75,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 's1x1',
    base64: false,
    stretch: true,
  },
  m1x1: {
    ...format.JPEG,
    size: { width: 300, height: 300 },
    quality: 75,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'm1x1',
    base64: false,
    stretch: true,
  },
  l1x1: {
    ...format.JPEG,
    size: { width: 683, height: 683 },
    quality: 70,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'l1x1',
    base64: false,
    stretch: true,
  },
  xl1x1: {
    ...format.JPEG,
    size: { width: 1080, height: 1080 },
    quality: 70,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'xl1x1',
    base64: false,
    stretch: true,
  },
  m3x4: {
    ...format.JPEG,
    size: { width: 300, height: 400 },
    quality: 75,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'm3x4',
    base64: false,
    stretch: true,
  },
  l3x4: {
    ...format.JPEG,
    size: { width: 456, height: 608 },
    quality: 70,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'l3x4',
    base64: false,
    stretch: true,
  },
  xl3x4: {
    ...format.JPEG,
    size: { width: 1080, height: 1440 },
    quality: 70,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'xl3x4',
    base64: false,
    stretch: false,
  },
  l16x9: {
    ...format.JPEG,
    size: { width: 1440, height: 810 },
    quality: 70,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'l16x9',
    base64: false,
    stretch: true,
  },
  xl16x9: {
    ...format.JPEG,
    size: { width: 2880, height: 1620 },
    quality: 70,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'xl16x9',
    base64: false,
    stretch: false,
  },
  l3x2: {
    ...format.JPEG,
    size: { width: 1024, height: 683 },
    quality: 70,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'l3x2',
    base64: false,
    stretch: true,
  },
  xl3x2: {
    ...format.JPEG,
    size: { width: 2048, height: 1366 },
    quality: 70,
    filter: 'Lanczos',
    ACL: ACL.public,
    dbField: null,
    graphqlField: 'xl3x2',
    base64: false,
    stretch: false,
  },
};

const calculateExtensionFormat = () => {
  const extensions = {};
  for (var formatName in format) {
    for (var i = 0; i < format[formatName].extensions.length; i++) {
      extensions[format[formatName].extensions[i]] =
        format[formatName].mimetype;
    }
  }
  return extensions;
};

export const extensionMimetype = calculateExtensionFormat();
