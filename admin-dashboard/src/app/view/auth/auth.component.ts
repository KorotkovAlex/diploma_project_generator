import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isShowError = false;
  authForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      login: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Your form data : ', this.authForm.value);

    this.authService.signIn({ body: this.authForm.value }).subscribe((val: any) => {
      console.log('val', val);
      localStorage.setItem('token', val.data.accessToken);
    });

    this.isShowError = true;
  }
}
