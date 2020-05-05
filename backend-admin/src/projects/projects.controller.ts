import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../users/user.decorator';
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

  get base(): CrudController<Project> {
    return this;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  createOne(@Request() req: any, @Body() dto: Project) {
    this.service.createProject({ project: dto });

    return;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/generate')
  generateProject(
    @CurrentUser() currentUser: User,
    @Request() req: any,
    @Body() project: Project,
  ) {
    this.service.generateProject({ project, currentUser });

    return;
  }
}
