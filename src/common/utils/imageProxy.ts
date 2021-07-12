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

export const createImage = ({
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
  width = Math.round(width);
  height = Math.round(height);
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

export const heightByWidth = ({
  orgHeight,
  orgWidth,
  newWidth,
}: {
  orgHeight: number;
  orgWidth: number;
  newWidth: number;
}): number => {
  orgWidth = Math.round(orgWidth);
  orgHeight = Math.round(orgHeight);
  newWidth = Math.round(newWidth);
  return Math.round((orgHeight / orgWidth) * newWidth);
};

export const widthByHeight = ({
  orgHeight,
  orgWidth,
  newHeight,
}: {
  orgHeight: number;
  orgWidth: number;
  newHeight: number;
}): number => {
  orgWidth = Math.round(orgWidth);
  orgHeight = Math.round(orgHeight);
  newHeight = Math.round(newHeight);
  return Math.round((orgWidth / orgHeight) * newHeight);
};

export const createSrcSet = ({
  imageUrl,
  width,
  height,
}: {
  imageUrl: string;
  width: number;
  height: number;
}): {
  [key: number]: string;
} => {
  const imageSizes = {};
  Object.values(SIZES).map((size) => {
    if (width < size) {
      return true;
    }
    imageSizes[size] = createImage({
      imageUrl,
      width: width,
      height: height,
    });
  });
  return imageSizes;
};
