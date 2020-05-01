import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  isShowError = false;
  newProjectForm: FormGroup;
  appPatterns;

  constructor(private http: HttpClient, private fb: FormBuilder, private projectsService: ProjectsService) {}

  ngOnInit() {
    this.newProjectForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      version: ['', Validators.required],
      appPatternId: ['']
    });

    this.fetchAppPatterns();
  }

  onSubmit() {
    this.projectsService
      .createNewProject({
        project: {
          name: this.newProjectForm.value.name,
          version: this.newProjectForm.value.version,
          appPattern: this.appPatterns[this.newProjectForm.value.appPatternId]
        }
      })
      .subscribe(result => {
        console.log('resilt', result);
      });
    this.isShowError = true;
  }

  fetchAppPatterns() {
    this.projectsService.fetchAppPatterns().subscribe(result => {
      this.appPatterns = result;
    });
  }
}
