import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { DetailsComponent } from './details/details.component';
import { NewProjectComponent } from './new/new-project.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'new-project', component: NewProjectComponent },
  { path: ':id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
