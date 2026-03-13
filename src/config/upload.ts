import path from "path";
import multer from "multer";
import crypto from "crypto";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  driver: process.env.STORAGE_DRIVER || "disk",

  directory: tmpFolder,
  uploadsDirectory: path.resolve(__dirname, "..", "..", "uploads"),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
