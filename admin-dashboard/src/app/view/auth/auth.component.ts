import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isShowError = false;
  authForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      login: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.signIn({ body: this.authForm.value }).subscribe((val: any) => {
      if (val.data.accessToken) {
        localStorage.setItem('token', val.data.accessToken);
        this.router.navigate(['/admin']);
      }
    });
  }
}
