import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsComponent } from './projects.component';
import { DetailsComponent } from './details/details.component';
import { NewProjectComponent } from './new/new-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from './projects.service';
import { ProjectsRoutingModule } from './projects.routing.module';

@NgModule({
  declarations: [ProjectsComponent, DetailsComponent, NewProjectComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ProjectsRoutingModule],
  providers: [ProjectsService],
  entryComponents: []
})
export class ProjectsModule {}
