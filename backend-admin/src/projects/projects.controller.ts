import { Controller } from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { User } from '../users/user.entity';

@Crud({
  model: {
    type: Project,
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
export class ProjectsController {
  constructor(public service: ProjectsService) {}
}
