import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, SidebarComponent, ProjectsComponent, ProjectDetailsComponent, NewProjectComponent],
  imports: [AdminRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  entryComponents: []
})
export class AdminModule {}
