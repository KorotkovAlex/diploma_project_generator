import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { AppPattern } from './app_patterns.entity';
import { AppPatternsService } from './app_patterns.service';

@Crud({
  model: {
    type: AppPattern,
  },
  query: {
    join: {
      users: {
        eager: true,
      },
    },
  },
})
@Controller('projects')
export class AppPatternsController {
  constructor(public service: AppPatternsService) {}

  get base(): CrudController<AppPattern> {
    return this;
  }
}
