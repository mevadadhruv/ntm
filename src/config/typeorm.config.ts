/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      entities: ['dist/**/*.entity.{js,ts}'],
      migrations: ['/../src/database/migrations/*-migration{.ts,.js}'],
      cli: {
        // entitiesDir: 'dist/**/*.entity.{js,ts}',
        migrationsDir: './src/config',
      },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      connectTimeout: parseInt(process.env.DB_ConnectTimeout),
      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/**/*-migration.{js,ts}'], //dist/**/*{.ts,.js}
  // migrations: [__dirname + '/../src/database/migrations/*{.ts,.js}'],
  cli: {
    // entitiesDir: 'dist/**/*.entity.{js,ts}',
    migrationsDir: './src/config',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  connectTimeout: parseInt(process.env.DB_ConnectTimeout),
  synchronize: false,
  logging: true,
};
