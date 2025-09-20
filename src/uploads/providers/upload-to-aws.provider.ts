import { Injectable, InternalServerErrorException, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Upload } from '../upload.entity';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UploadToAwsProvider {

    constructor(
        private readonly configService: ConfigService
    ){}

    public async uploadFile(file: Express.Multer.File): Promise<string> {
     try {
        const s3 = new S3();
        const upload = await s3.upload({
            Bucket: this.configService.get('appConfig.awsBucketName') || '',
            Key: this.generateFileName(file),
            Body: file.buffer,
            ContentType: file.mimetype
        }).promise();
        return upload.Key;

     } catch (error) {
        throw new RequestTimeoutException(error);
     }
    }
   private generateFileName(file: Express.Multer.File): string {
    let name = file.originalname.split('.')[0];
    name.replace(/\s+/g, '').trim();
    let extension = path.extname(file.originalname);
    let timestamp = new Date().getTime().toString().trim();
    let uuidString = uuidv4();
    return `${name}-${timestamp}-${uuidString}${extension}`;

    }
}
