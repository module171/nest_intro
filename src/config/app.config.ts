import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
    environment: process.env.NODE_ENV || 'production',
    apiVersion: process.env.API_VERSION || 'v1',
    awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME || 'my-bucket',
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || 'my-access-key-id',
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID || 'my-secret-access-key',
    awsCloudFrontUrl: process.env.AWS_CLOUDFRONT_URL || 'https://my-cloudfront.com',
    mailHost: process.env.MAIL_HOST || 'smtp.gmail.com',
    mailUser: process.env.SMTP_USERNAME || 'your-email@gmail.com',
    mailPass: process.env.SMTP_PASSWORD || 'your-app-password',
}));

