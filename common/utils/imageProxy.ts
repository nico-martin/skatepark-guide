const IMAGE_HOST = 'https://skateparkguide.ch/wp-content/uploads/';

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
  blur = 0,
  quality = 0,
}: {
  imageUrl: string;
  width?: number;
  height?: number;
  blur?: number;
  quality?: number;
}): string => {
  let proxyString = 'hello-images/';
  width = Math.round(width);
  height = Math.round(height);
  if (width !== 0 || height !== 0) {
    proxyString += `size-${width}x${height}/`;
  }
  if (blur !== 0) {
    proxyString += `blur-${blur}/`;
  }
  if (quality !== 0) {
    proxyString += `quality-${quality}/`;
  }

  if (imageUrl.indexOf(IMAGE_HOST) !== 0) {
    return '';
  }

  const imgFolder = imageUrl.replace(IMAGE_HOST, '');

  return IMAGE_HOST + proxyString + imgFolder;
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
