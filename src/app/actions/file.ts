'use server'

import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import { env } from 'process';

const client = new S3Client({ 
  region: env.S3_REGION, 
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY!, 
    secretAccessKey: env.S3_SECRET_ACCESS_KEY!
  } 
});

export async function upload(formData: FormData) {
  console.debug(formData)
}

export async function signedUploadUrl({key}: {key: string}) {
  const command = new PutObjectCommand({ Bucket: env.S3_BUCKET, Key: key });
  return getSignedUrl(client, command, { expiresIn: 60 });
}