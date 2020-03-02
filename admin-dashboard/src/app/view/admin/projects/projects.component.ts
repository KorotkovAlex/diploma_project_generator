import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.fetchProjects();
  }

  onClick(project) {
    console.log('myFunc', project);
  }

  fetchProjects() {
    this.projectsService.getProjects().subscribe(result => {
      this.projects = result;
    });
  }
}
