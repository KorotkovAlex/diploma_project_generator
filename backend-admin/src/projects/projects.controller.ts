import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Crud({
  model: {
    type: Project,
  },
})
@Controller('projects')
export class ProjectsController {
  constructor(public service: ProjectsService) {}
}
