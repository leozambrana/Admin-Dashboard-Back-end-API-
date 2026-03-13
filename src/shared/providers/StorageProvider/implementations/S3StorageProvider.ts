import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";
import fs from "fs";
import uploadConfig from "../../../../config/upload";
import { IStorageProvider } from "../models/IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }

  public async getSignedUrl(file: string, folder: string): Promise<string> {
    const bucket = process.env.AWS_S3_BUCKET || "";
    
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: `${folder}/${file}`,
    });

    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  public async getPresignedUploadUrl(file: string, folder: string, contentType: string = "image/jpeg"): Promise<string> {
    const bucket = process.env.AWS_S3_BUCKET || "";
    
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: `${folder}/${file}`,
      ContentType: contentType,
    });

    return getSignedUrl(this.client, command, { expiresIn: 900 });
  }

  public async save(file: string, folder: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.directory, file);
    const fileContent = await fs.promises.readFile(originalPath);

    const bucket = process.env.AWS_S3_BUCKET || "";

    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `${folder}/${file}`,
        Body: fileContent,
        ContentType: "image/jpeg",
      })
    );

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async delete(file: string, folder: string): Promise<void> {
    const bucket = process.env.AWS_S3_BUCKET || "";

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: `${folder}/${file}`,
      })
    );
  }
}
