import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { appCreate } from './app.create';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  appCreate(app);
  // app.useGlobalInterceptors(new DataResponseInterceptor());
  await app.listen(3000);

  console.log(`✅ Application is running on: http://localhost:3000`);
}
bootstrap();
