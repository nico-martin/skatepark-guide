export type ApiImageI = {
  url: string;
  width: number;
  height: number;
  alt: string;
  id: ImageId;
  title: string;
  credits: ImageCredits;
};

export type ImageId = number;

export type ImageCredits = {
  text: string;
  url: string;
};

export interface ListImageI extends ApiImageI {
  listKey: string;
}

export interface ListFileI {
  listKey: string;
  file: File;
}
