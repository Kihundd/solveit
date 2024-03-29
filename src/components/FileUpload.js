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


function FileUpload(props) {
    
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
        console.log(file);

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: `images/${file.name}`
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    return (
        <div style={{marginTop: '20px'}}>
            <div>{progress}%</div>
            <input type="file" onChange={handleFileInput}/>
            <Button variant="contained" size="small" onClick={() => uploadFile(selectedFile)}> 사진등록</Button>
            {/* <Button variant="contained" size="small" onClick={() => {
                console.log()
            }}> 사진등록</Button> */}
        </div>
      );
}

export default FileUpload;