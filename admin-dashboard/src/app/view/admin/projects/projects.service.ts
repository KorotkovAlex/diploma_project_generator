import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class ProjectsService {
  constructor(public jwtHelper: JwtHelperService, private apiService: ApiService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  public getProjects() {
    return this.apiService.get('projects');
  }

  public getProjectDetails({ projectId }) {
    return this.apiService.get(`projects/${projectId}`);
  }

  public getInfoAbout({ baseUrl }) {
    return this.apiService.get(`descriptions`, `http://${baseUrl}/`);
  }

  public editCompanyDescription({ project, baseUrl, formData }) {
    return this.apiService.patchFormData(`descriptions/${project.id}`, `http://${baseUrl}/`, formData);
  }

  public createNewProject({ project }) {
    return this.apiService.postFormData('projects', project);
  }
}
