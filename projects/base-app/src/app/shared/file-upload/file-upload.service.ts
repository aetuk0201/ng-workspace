import { Injectable } from '@angular/core';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { XhrHttpHandler } from '@aws-sdk/xhr-http-handler';
import { DynamoDBClient, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { Helper } from '../helper';
import { Buffer as buffer } from "buffer";
import { IPhoto } from '../../albums/iphoto';

export class fileUploadResponse{
  percentCompleted: number = 0.0;
  isSuccess: boolean = false;
  message: string = '';
  httpStatusCode?: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  parallelUpload: Upload | null = null;
  photo: IPhoto | null = null;
  fileUploadResponse: fileUploadResponse = new fileUploadResponse();
  percentCompleted: number = 0.0;

  async uploadFile(photo: IPhoto) { 

    const s3Client = new S3Client({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
      region: 'us-east-2',
      requestHandler: new XhrHttpHandler({})
    });

    // const fileStream = file?.stream();

    const paramsUpload = {
      Bucket: 'family-moments',
      Key: photo.photoId,
      Body: photo.file
    };    

    try {

      this.parallelUpload = new Upload({
        client: s3Client,
        params: paramsUpload,
        queueSize: 3,
      });      

      this.parallelUpload.on("httpUploadProgress", (progress) => {
        this.percentCompleted = (progress.loaded ?? 0) / (progress.total ?? 0);
      });

      await this.parallelUpload.done();
      console.log("upload complete");
      console.log('upload result: ', this.parallelUpload);

      this.fileUploadResponse.percentCompleted = this.percentCompleted;
      this.fileUploadResponse.isSuccess = true;
      this.fileUploadResponse.message = 'File uploaded successfully!';

      } catch (error) {
        console.log(error);
        this.fileUploadResponse.percentCompleted = this.percentCompleted;
        this.fileUploadResponse.isSuccess = false;
        this.fileUploadResponse.message = 'An error occured while uploading your file. Please try again later.';
    } 
    
    return this.fileUploadResponse;
  }

  async uploadBase64String(photo: IPhoto, file: File) { 

    const s3Client = new S3Client({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
      region: 'us-east-2',
      requestHandler: new XhrHttpHandler({})
    });

    const base64data = buffer.from(file.toString().replace(/^data:image\/\w+;base64,/, ""), 'base64');
    console.log('base64data: ', base64data);
    // const fileStream = file?.stream();
    const imgBase64 = await Helper.convertImageToBase64(file);
    console.log('base64: ', imgBase64);
    // const imgString = Helper.encodeBase64String(base64data);
    // console.log('imgString: ', imgString);

    const paramsUpload = {
      Bucket: 'family-moments',
      Key: photo.photoId, 
      ContentType: photo.mimeType,
      ContentEncoding: 'base64',
      Body: base64data
    };    

    try {
      if (this.parallelUpload) {
        this.parallelUpload.on("httpUploadProgress", (progress) => {
          this.percentCompleted = (progress.loaded ?? 0) / (progress.total ?? 0);
        });
      }
      this.fileUploadResponse.isSuccess = true;
      this.fileUploadResponse.message = 'File uploaded successfully!';
    } catch (error) {
      console.log(error);
      this.fileUploadResponse.percentCompleted = this.percentCompleted;
      this.fileUploadResponse.isSuccess = false;
      this.fileUploadResponse.message = 'An error occurred while uploading your file. Please try again later.';
    } 
    
    return this.fileUploadResponse;
  }

  async savePhoto(photo: IPhoto) {

    const dynamoClient = new DynamoDBClient({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
       region: 'us-east-2'
    });

    const docClient = DynamoDBDocumentClient.from(dynamoClient);
    const command = new PutCommand({
      TableName: "Photos",
      Item: photo
    });

    try {
        const response = await docClient.send(command);
        console.log(response);

        this.fileUploadResponse.isSuccess = true;
        this.fileUploadResponse.message = 'The photo has been saved successfully!';
        this.fileUploadResponse.httpStatusCode = 200;

    } catch (error) {
        console.log(error);

        this.fileUploadResponse.isSuccess = false;
        this.fileUploadResponse.message = 'An error occured while saving your file. Please try again later.';
    }

    return this.fileUploadResponse;
  }

  async getPhotos(albumId: string) {
    const dynamoClient = new DynamoDBClient({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
       region: 'us-east-2'
    });

    const docClient = DynamoDBDocumentClient.from(dynamoClient);
    const command = new ScanCommand({
      TableName: "Photos",
      ProjectionExpression: "#albumid, albumId, photoId, title, createdAt, updatedAt",
      ExpressionAttributeNames: { "#albumid": albumId }
    });

    const response = await docClient.send(command);

    return response;
  }
      
}
