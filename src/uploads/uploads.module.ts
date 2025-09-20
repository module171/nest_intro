import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsProvider],
  imports: [TypeOrmModule.forFeature([Upload]),ConfigModule.forFeature(appConfig)]
})
export class UploadsModule {}
