import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface ConfigType {
  APP_ENV: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
}

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  private config: ConfigType;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    const data: any = dotenv.parse(fs.readFileSync(`.env.${environment}`));

    data.APP_ENV = environment;
    data.DB_PORT = Number(data.DB_PORT);

    this.config = data as ConfigType;
  }

  getByKey(key: string): string {
    return this.envConfig[key];
  }

  getConfig(): ConfigType {
    return this.config;
  }

  isProd(): boolean {
    return this.config.APP_ENV === 'production';
  }

  isDev(): boolean {
    return this.config.APP_ENV === 'development';
  }
}
