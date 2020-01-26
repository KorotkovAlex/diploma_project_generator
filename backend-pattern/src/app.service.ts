import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getConfig(): any {
    const config = {
      name: 'MobilePattern',
      version: '1.0',
      kindOfNavigation: 'bottom',
    };

    return config;
  }
}
