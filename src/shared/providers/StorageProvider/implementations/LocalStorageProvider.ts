import fs from "fs";
import path from "path";
import uploadConfig from "../../../../config/upload";
import { IStorageProvider } from "../models/IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  public async save(file: string, folder: string): Promise<string> {
    const destinationFolder = path.resolve(uploadConfig.uploadsDirectory, folder);

    if (!fs.existsSync(destinationFolder)) {
      await fs.promises.mkdir(destinationFolder, { recursive: true });
    }

    await fs.promises.rename(
      path.resolve(uploadConfig.directory, file),
      path.resolve(destinationFolder, file),
    );

    return file;
  }

  public async delete(file: string, folder: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsDirectory, folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async getSignedUrl(file: string, folder: string): Promise<string> {
    return file;
  }

  public async getPresignedUploadUrl(file: string, folder: string, contentType?: string): Promise<string> {
    return "local";
  }
}
