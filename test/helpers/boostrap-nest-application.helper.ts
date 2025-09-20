import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../../src/app.module";
import { appCreate } from "../../src/app.create";

export async function bootstrapNestApplication(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);
    appCreate(app);
    await app.init();
    return app;
}