import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import {
  Crud,
  CrudAuth,
  Override,
  ParsedRequest,
  CrudRequest,
  ParsedBody,
  CrudController,
} from '@nestjsx/crud';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/users/user.decorator';

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
    console.log('currentUser', req.user);
    console.log('currentUser', dto);

    // this.base.createOneBase(req, dto)
    return;
  }
}
