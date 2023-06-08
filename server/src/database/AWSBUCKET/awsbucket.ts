import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const bucketName = process.env.BUCKET as string;
const regionName = process.env.REGION as string;
const accessKey = process.env.ACCESS_KEY as string;
const secret = process.env.ACCESS_SECRET as string;

export const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secret,
  },
  region: regionName,
});
