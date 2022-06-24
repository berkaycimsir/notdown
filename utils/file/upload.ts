import axios from 'axios';
import { CLOUDINARY_UPLOAD_URL } from './cloudinary';
import { UploadPresets, UploadFolders, CloudinaryFile } from './types';

type UploadImageArgs = {
  file: File;
  preset: UploadPresets;
  folder: UploadFolders;
  onSuccess?: (file: CloudinaryFile) => Promise<void>;
  onFail?: () => void;
};

const uploadImage = async ({
  file,
  preset,
  folder,
  onSuccess,
  onFail,
}: UploadImageArgs): Promise<void> => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', preset);
  formData.append('folder', folder);

  const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);

  if (response.status === 200) {
    await onSuccess?.(response.data as CloudinaryFile);
  } else onFail?.();
};

export { uploadImage };
