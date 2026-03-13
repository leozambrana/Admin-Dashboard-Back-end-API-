export interface IStorageProvider {
  save(file: string, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
  getSignedUrl(file: string, folder: string): Promise<string>;
  getPresignedUploadUrl(file: string, folder: string, contentType?: string): Promise<string>;
}
