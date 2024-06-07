import { IMG_PREFIX } from './constant';

/**
 * 补全图片地址
 */
export const prefixImgUrl = (path: string) => {
  return `${IMG_PREFIX}${path}`;
};
