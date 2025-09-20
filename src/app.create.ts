import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule } from "@nestjs/swagger";
import { DocumentBuilder } from "@nestjs/swagger";
import { config } from "aws-sdk";

export function appCreate(app: INestApplication) : void {
    // Lấy ConfigService để đọc environment variables
    const configService = app.get(ConfigService);
  
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,           // Loại bỏ properties không được định nghĩa
      forbidNonWhitelisted: true, // Throw error nếu có properties không được định nghĩa
      transform: true,           // Tự động transform types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }));
  
    const configswagger = new DocumentBuilder()
      .setTitle('SQL Database API')
      .setDescription('API documentation')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, configswagger);
    SwaggerModule.setup('api', app, document);
  
    // const port = configService.get<number>('PORT') || 3000;
    // const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
    // const dbName = configService.get<string>('DATABASE_NAME') || 'unknown';
  
    // // Log thông tin môi trường
    // console.log('🚀 Application starting...');
    // console.log(`📊 Environment: ${nodeEnv}`);
    // console.log(`🗄️  Database: ${dbName}`);
    // console.log(`🌐 Port: ${port}`);
    // console.log(`📚 Swagger: http://localhost:${port}/api`);
    app.enableCors();
  
   config.update({
     credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId') || '',
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey') || '',
     },
     region: configService.get('appConfig.awsRegion'),
   
   });
}