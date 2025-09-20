import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { UploadFileInterface } from '../interfaces/upload-file.interface';
import { FileTypes } from '../enums/file-types.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadsService {
    constructor(
        @InjectRepository(Upload)
        private readonly uploadsRepository: Repository<Upload>,

        private readonly uploadToAwsProvider: UploadToAwsProvider,
        private readonly configService: ConfigService
    ){}
    public async uploadFile(file: Express.Multer.File): Promise<Upload> {
        if(!['image/jpeg','image/png','image/jpg','image/gif','image/webp'].includes(file.mimetype)){
            throw new BadRequestException('Invalid file type');
        }

       try {
        const name = await this.uploadToAwsProvider.uploadFile(file);
        const uploadFile: UploadFileInterface = {
            name: name,
            path: `https://${this.configService.get('appConfig.awsCloudFrontUrl')}/${name}`,
            type: FileTypes.IMAGE,
            mime: file.mimetype,
            size: file.size
        };
        const upload = this.uploadsRepository.create(uploadFile);
        return await this.uploadsRepository.save(upload);
       } catch (error) {
        throw new RequestTimeoutException(error);
       }
    }
}
