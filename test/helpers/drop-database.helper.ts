import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
export async function dropDatabase(configService:ConfigService) : Promise<void> {
    const dataSource = await new DataSource({
      
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        synchronize: configService.get('database.synchronize'),

        // logging: configService.get('LOGGING') === 'true',
        // entities: [User, Profile, PostEntity, Tag],
        ssl: configService.get('database.ssl'),
    }).initialize();
    await dataSource.dropDatabase();
    await dataSource.destroy();
}