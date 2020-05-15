import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  project: any;
  projectId: any;
  detailsForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private projectsService: ProjectsService) {
    this.route.params.subscribe(param => {
      this.projectId = param.id;
    });
  }

  ngOnInit() {
    this.detailsForm = this.fb.group({
      companyName: [''],
      about: ['']
    });

    this.projectsService.getProjectDetails({ projectId: this.projectId }).subscribe(result => {
      this.project = result;
      this._fetchInfoAbout();
    });
  }

  generateProject() {
    console.log('generate project');

    this.projectsService.generateProject(this.project).subscribe(result => {
      console.log('test', result);
    });
  }

  _fetchInfoAbout() {
    this.projectsService.getInfoAbout({ baseUrl: this.project.backendApi }).subscribe(result => {
      // this.project = result;

      console.log('getInfoAbout', result);

      this.detailsForm.setValue({ companyName: result[0].companyName, about: result[0].about });
    });
  }

  onSubmit() {
    console.log('onSubmit');
    this._editCompanyDescription();
  }

  _editCompanyDescription() {
    console.log('this.detailsForm', this.detailsForm);
    this.projectsService
      .editCompanyDescription({
        project: this.project,
        baseUrl: this.project.backendApi,
        formData: this.detailsForm.value
      })
      .subscribe(result => {
        // this.project = result;

        console.log('_editCompanyDescription', result);
      });
  }
}
