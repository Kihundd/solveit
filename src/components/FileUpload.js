import React, {useState} from "react";
import AWS from 'aws-sdk';
import { Button } from '@mui/material';
import {ACCESS_KEY, SECRET_ACCESS_KEY, REGION, S3_BUCKET} from './FileUploadKey';

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const getUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
const getImageUrl = (bucketName, fileId) => {
    return `https://${bucketName}.s3.${REGION}.amazonaws.com/questionFiles/${fileId}`
}

export const IMAGE = "image";
export const getFileUrl = async (file, type) => {
    const fileId = getUniqueId();

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: `questionFiles/${fileId}`
    };

    const response = await myBucket.putObject(params).promise();

    return getImageUrl(S3_BUCKET, fileId)
}
export default {};