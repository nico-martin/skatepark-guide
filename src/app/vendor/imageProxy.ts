const IMAGE_HOST = 'https://skateparkguide.ch/';
const PROXY_HOST = 'https://img.skatepark.guide/';
const SIZES: {
  [key: string]: number;
} = {
  window: 2000,
  page: 1200,
  large: 640,
  medium: 320,
  small: 160,
};

const createImage = ({
  imageUrl,
  width = 0,
  height = 0,
  transform = {},
}: {
  imageUrl: string;
  width?: number;
  height?: number;
  transform?: {
    [key: string]: any;
  };
}): string => {
  let proxyString = '';
  if (width !== 0 || height !== 0) {
    proxyString = `size-${width}x${height}/`;
  }

  const transforms: Array<string> = [];
  Object.entries(transform).map(([key, value]) => {
    transforms.push(`[${key},${value}]`);
  });
  if (transforms.length) {
    proxyString += `transform${transforms.join('')}/`;
  }

  return imageUrl.replace(IMAGE_HOST, PROXY_HOST + proxyString);
};

export const thumbnail = (imageUrl: string) =>
  createImage({
    imageUrl,
    width: 400,
    transform: {
      blur: 20,
      quality: 50,
    },
  });

export const srcSet = ({
  imageUrl,
  width = 0,
}: {
  imageUrl: string;
  width?: number;
}): {
  [key: number]: string;
} => {
  const imageSizes = {};
  Object.values(SIZES).map(size => {
    if (width && width < size) {
      return true;
    }
    imageSizes[size] = createImage({ imageUrl, width: size });
  });
  return imageSizes;
};

export const src = (imageUrl: string) => createImage({ imageUrl });
