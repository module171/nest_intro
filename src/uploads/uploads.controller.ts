import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Upload } from './upload.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { UploadsService } from './providers/uploads.service';

@Controller('uploads')
export class UploadsController {
    constructor(
        private readonly uploadsService: UploadsService
    ){}
    @Post('file')
    @ApiHeaders([
        {
            name : 'Content-Type',
            description: 'multipart/form-data'
        },
        {
            name : 'Authorization',
            description: 'Bearer token'
        }
    ])
    @ApiOperation({ summary: 'Upload file' })
    @UseInterceptors(FileInterceptor('file'))   
    public uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Upload> {
        return this.uploadsService.uploadFile(file);
    }
}
