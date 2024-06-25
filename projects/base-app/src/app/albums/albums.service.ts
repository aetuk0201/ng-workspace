import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamoDBClient, QueryCommand, QueryCommandOutput, ScanCommand, ScanCommandOutput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { Album } from './album';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IPhoto } from './iphoto';
import { IAlbum } from './ialbum';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  photos: IPhoto[] = [];
  albums: IAlbum[] = [];

  constructor() { }

  async createAlbum(album: Album) : Promise<boolean> {
    
    const dynamoClient = new DynamoDBClient({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
       region: 'us-east-2'
    });

    const docClient = DynamoDBDocumentClient.from(dynamoClient);
    const command = new PutCommand({
      TableName: "Albums",
      Item: album
    });

    let response = null;
    try {
      response = await docClient.send(command);
        console.log(response);

    } catch (error) {
        console.log(error);
    }

    return response && response.$metadata.httpStatusCode === 200 ? true : false;
  }

  async getAlbumById(albumId: string): Promise<IAlbum> {
    const dynamoClient = new DynamoDBClient({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
       region: 'us-east-2'
    });

    const docClient = DynamoDBDocumentClient.from(dynamoClient);
    const command = new QueryCommand({
      TableName: "Albums",
      KeyConditionExpression:
        "Album = :albumId = :albumid",
      ExpressionAttributeValues: {
        ":albumid": { S: albumId }
      },
      ConsistentRead: true,
    });

    let album: IAlbum | null = null;
    await docClient.send(command).then((data:ScanCommandOutput) => {
      
      if (data.Items) {
        for (const item of data.Items) {
          album = {
            albumId: item['albumId']['S'] ?? '',
            title: item['title']['S'],
            description: item['description']['S'] ?? '',
            createdAt: item['createdAt']['S'] ?? '',
            updatedAt: item['updatedAt']['S'] ?? ''
          };
        }
      }
    });    

    return album ? album : {} as IAlbum;
  }

  async getAlbums(): Promise<IAlbum[]> {
    const dynamoClient = new DynamoDBClient({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
       region: 'us-east-2'
    });

    const docClient = DynamoDBDocumentClient.from(dynamoClient);
    const command = new ScanCommand({
      TableName: "Albums",
      ProjectionExpression:
        "albumId, title, description"
      });

    this.albums = [];
    await docClient.send(command).then((data:ScanCommandOutput) => {
      console.log(data);
      if (data.Items) {
        for (const item of data.Items) {
          let album:IAlbum = {
            albumId: item['albumId']['S'] ?? '',
            title: item['title']['S'],
            description: item['description']['S'],
            // createdAt: item['createdAt']['S'] ? item['createdAt']['S'] : '',
            // updatedAt: item['updatedAt']['S'] ? item['updatedAt']['S'] : ''
          };
          this.albums.push(album);
        }
      }
    });     

    return this.albums;
  }

  async getPhotoByIdS3(key: string) {
    
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
      region: 'us-east-2'
    });

    const command = new GetObjectCommand({
        Bucket: "family-moments",
        Key: key
      });

    try { 

      const response = await s3Client.send(command);
      console.log(response);

      if (response.Body) {
        const stream = response.Body.transformToWebStream();
        console.log(stream);
      }

      return response
    } 
    catch (error) {
      //throw error;
      console.log(error);
    } 

    return null;
  }

    async getPhotoById(photoId: string) {
    const dynamoClient = new DynamoDBClient({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
       region: 'us-east-2'
    });

    const docClient = DynamoDBDocumentClient.from(dynamoClient);
    const command = new QueryCommand({
      TableName: "Photos",
      KeyConditionExpression:
        "photoId = :photoid",
      ExpressionAttributeValues: {
        ":photoid": { S: photoId }
      },
      ConsistentRead: true,
    });

    const response = await docClient.send(command);    

    return response;
    }
  
  async getPhotosByAlbumId(albumId: string): Promise<IPhoto[]> {
    
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
      
      ProjectionExpression: "photoId, albumId, title, description, photoName, mimeType, urlLink, createdAt, updatedAt",
      FilterExpression: "albumId = :albumid",
      ExpressionAttributeValues: { ":albumid": { S: albumId } }
    });

    this.photos = [];
    //const response = await docClient.send(command);
    await docClient.send(command).then((data:ScanCommandOutput) => {

      if (data?.Items) {
        
        for (const item of data.Items) {

          let photos: IPhoto = {
            photoId: item['photoId']['S'] ?? '',
            albumId: item['albumId']['S'] ?? '',
            photoName: item['photoName']['S'],
            title: item['title']['S'],
            //description: item['description']['S'] ? item['description']['S'] : '',
            mimeType: item['mimeType']['S'] ? item['mimeType']['S'] : '',
            urlLink: item['urlLink']['S'] ?? '',
            createdAt: item['createdAt']['S'] ? item['createdAt']['S'] : '',
            updatedAt: item['updatedAt']['S'] ? item['updatedAt']['S'] : ''
          };

          this.photos.push(photos);
        };
      }
    
    });

    return this.photos;
    //return response;
  }

   async getPhotosByAlbum(albumId: string) {
    const dynamoClient = new DynamoDBClient({
      credentials: {
        accessKeyId: 'AKIA27PGE5YWWTT52M5O',
        secretAccessKey: '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'
      },
       region: 'us-east-2'
    });

    const docClient = DynamoDBDocumentClient.from(dynamoClient);
    const command = new QueryCommand({
      TableName: "Photos",
      KeyConditionExpression:
        "albumId = :albumid",
      ExpressionAttributeValues: {
        ":albumid": { S: albumId }
      },
      ConsistentRead: true,
    });

     //const response = await docClient.send(command);
     
    //  const response = await docClient.send(command).then((item) => {
    //    map((item) => { 
    //      let photos:IPhoto  = {
    //         photoId: item['photoId']['S'],
    //         albumId: item['albumId']['S'],
    //         photoName: item['photoName']['S'],
    //         title: item['title']['S'],
    //         description: item['description']['S'],
    //         mimeType: item['mimeType']['S'],
    //         urlLink: item['urlLink'] ? item['urlLink']['S'] : '',
    //         createdAt: item['createdAt']['S'],
    //         updatedAt: item['updatedAt']['S'],
    //      };         
    //      this.photos.push(photos);
         
    //      });
      
    //    });    

    //  return this.photos;
  }
  
}
