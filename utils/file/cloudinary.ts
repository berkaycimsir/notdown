import { Cloudinary } from '@cloudinary/url-gen';
import { UploadFolders, UploadPresets } from './types';

export const CLOUD_NAME = 'berkaycmsr';
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

const cloud = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

export { cloud, UploadPresets, UploadFolders };
