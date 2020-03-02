import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from './projects/projects.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AdminComponent, SidebarComponent],
  imports: [AdminRoutingModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ProjectsService],
  entryComponents: []
})
export class AdminModule {}
