import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private apiService: ApiService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  public signIn({ body }) {
    return this.apiService.post('auth/login', body);
    // console.log('result', result);
  }
}
