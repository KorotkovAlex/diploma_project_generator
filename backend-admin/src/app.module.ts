import { Module, CacheModule, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

function DatabaseOrmModule(): DynamicModule {
  const configService = new ConfigService();
  const config = configService.getConfig();
  const isProd = configService.isProd();
  const entities = [User];

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: !isProd,
    logging: !isProd,
    ssl: isProd,
    entities,
  });
}

@Module({
  imports: [
    CacheModule.register(),
    DatabaseOrmModule(),
    UsersModule,
    ConfigModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
