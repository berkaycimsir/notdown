enum UploadFolders {
  PROFILE_IMAGE = 'profile_images',
}

enum UploadPresets {
  PROFILE_IMAGE = 'profile_image',
}

type CloudinaryFile = {
  access_mode?: string;
  asset_id?: string;
  bytes: number;
  created_at?: string;
  etag?: string;
  folder: UploadFolders;
  format: string;
  height: number;
  original_extension: string;
  original_filename: string;
  placeholder?: boolean;
  public_id: string;
  resource_type: string;
  secure_url?: string;
  signature?: string;
  tags?: string[];
  type?: string;
  url?: string;
  version?: number;
  version_id?: string;
  width: number;
};

export { UploadPresets, UploadFolders };
export type { CloudinaryFile };
