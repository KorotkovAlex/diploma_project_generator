import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  isShowError = false;
  newProjectForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.newProjectForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      version: ['', Validators.required],
      typeMenu: [0]
    });
  }

  onSubmit() {
    console.log('Your form data : ', this.newProjectForm.value);
    this.isShowError = true;
  }
}
