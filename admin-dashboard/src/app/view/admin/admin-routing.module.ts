import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AdminComponent } from './admin.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { NewProjectComponent } from './new-project/new-project.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'projects', component: ProjectsComponent },
      { path: 'new-project', component: NewProjectComponent },
      { path: 'projects/:id', component: ProjectDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
