import {
    v2 as cloudinary,
    UploadApiResponse
} from "cloudinary";
import { Readable } from "stream";

export class CloudinaryService {
  constructor() {
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });
  }

  private bufferToStream = (buffer: Buffer) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    return readable;
  };

  upload = (file: Express.Multer.File): Promise<UploadApiResponse> => {
    return new Promise((resolve, rejects) => {
      const readableStream = this.bufferToStream(file.buffer);

      const uploadStream = cloudinary.uploader.upload_stream(
        (err, result: UploadApiResponse) => {
          if (err) return rejects(err);

          if (!result) return rejects(new Error("Upload Failed!"));

          resolve(result);
        }
      );

      readableStream.pipe(uploadStream);
    });
  };
}
