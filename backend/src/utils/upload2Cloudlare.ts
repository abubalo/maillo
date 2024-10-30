import { env } from "@config/env";
import {
  S3Client,
  PutObjectCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";

const REGION = env.REGION;
const ACCESS_KEY_ID = env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = env.SECRET_ACCESS_KEY;
const BUCKET_NAME = env.BUCKET_NAME;
const ENDPOINT = env.R2_ENDPOINT;

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  endpoint: ENDPOINT,
});

export async function uploadToCloudflare(
  fileName: string,
  fileContent: Buffer,
  filePath: string,
): Promise<string> {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("File uploaded successfully:", fileName);

    return `https://${BUCKET_NAME}.${ENDPOINT.split("//")[1]}/${fileName}`;
  } catch (error) {
    if (error instanceof S3ServiceException) {
      console.error("Error uploading file to R2:", error.message);
    } else {
      console.error("Error uploading file:", error);
    }
    throw error;
  }
}
