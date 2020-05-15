import { Module, CacheModule, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';
import { AppPattern } from './app_patterns/app_patterns.entity';
import { AppPatternsModule } from './app_patterns/app_patterns.module';
import { Files } from './files/files.entity';
import { FilesModule } from './files/files.module';
import { FileUploadService } from './file_upload/file_upload.service';
import { FileUploadController } from './file_upload/file_upload.controller';
import { AboutCompaniesService } from './about-companies/about-companies.service';
import { AboutCompaniesController } from './about-companies/about-companies.controller';
import { AboutCompaniesModule } from './about-companies/about-companies.module';
import { ContactsCompaniesService } from './contacts-companies/contacts-companies.service';
import { ContactsCompaniesController } from './contacts-companies/contacts-companies.controller';
import { ContactsCompaniesModule } from './contacts-companies/contacts-companies.module';
import { ServicesCompaniesService } from './services-companies/services-companies.service';
import { ServicesCompaniesController } from './services-companies/services-companies.controller';
import { ServicesCompaniesModule } from './services-companies/services-companies.module';
import { RegistretionsForServicesService } from './registretions-for-services/registretions-for-services.service';
import { RegistretionsForServicesController } from './registretions-for-services/registretions-for-services.controller';
import { RegistretionsForServicesModule } from './registretions-for-services/registretions-for-services.module';
import { AboutCompany } from './about-companies/about-company.entity';
import { ContactCompany } from './contacts-companies/contacts-company.entity';
import { RegistretionForService } from './registretions-for-services/registretions-for-services.entity';
import { ServicesCompany } from './services-companies/services-company.entity';
function DatabaseOrmModule(): DynamicModule {
  const configService = new ConfigService();
  const config = configService.getConfig();
  const isProd = configService.isProd();
  const entities = [
    User,
    Project,
    Files,
    AppPattern,
    AboutCompany,
    ContactCompany,
    RegistretionForService,
    ServicesCompany,
  ];

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
    ProjectsModule,
    ConfigModule,
    AuthModule,
    AppPatternsModule,
    FilesModule,
    AboutCompaniesModule,
    ContactsCompaniesModule,
    ServicesCompaniesModule,
    RegistretionsForServicesModule,
  ],
  controllers: [AppController, FileUploadController],
  providers: [AppService, FileUploadService],
})
export class AppModule {}
