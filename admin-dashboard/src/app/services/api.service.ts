import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class ApiService {
  _baseUrl = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  public get(url: string, baseUrl = this._baseUrl, observe?, responseType?) {
    const accessToken = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: accessToken
    });
    const params = { headers };
    if (observe === 'response') {
      params['observe'] = 'response';
    }
    if (responseType === 'text') {
      params['responseType'] = 'text';
    }
    return this._httpClient.get(baseUrl + url, params);
  }

  public post(url: string, body: object, observe?, responseType?) {
    const accessToken = localStorage.getItem('token') || '';
    console.log('accessToken', accessToken);
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: accessToken
    });
    const params = { headers };
    if (observe === 'response') {
      params['observe'] = 'response';
    }
    if (responseType === 'text') {
      params['responseType'] = 'text';
    }

    console.log('this._baseUrl + url', this._baseUrl + url);

    return this._httpClient.post(this._baseUrl + url, body, params);
  }

  public postFormData(url: string, formData: FormData, observe?, responseType?) {
    const accessToken = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    const params = { headers };
    if (observe === 'response') {
      params['observe'] = 'response';
    }
    if (responseType === 'text') {
      params['responseType'] = 'text';
    }

    return this._httpClient.post(this._baseUrl + url, formData, params);
  }

  public patchFormData(url: string, baseUrl = this._baseUrl, formData: FormData, observe?, responseType?) {
    const accessToken = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: accessToken
    });
    const params = { headers };
    if (observe === 'response') {
      params['observe'] = 'response';
    }
    if (responseType === 'text') {
      params['responseType'] = 'text';
    }

    return this._httpClient.patch(baseUrl + url, formData, params);
  }

  //   public put(url: string, body: object, observe?, responseType?) {
  //     let accessToken = this._cookieService.get('accessToken') || '';
  //     let headers = new HttpHeaders({
  //       'Content-type': 'application/json',
  //       token: accessToken
  //     });
  //     let params = { headers: headers };
  //     if (observe == 'response') params['observe'] = 'response';
  //     if (responseType == 'text') params['responseType'] = 'text';

  //     return this._httpClient.put(this._baseUrl + url, body, params);
  //   }

  //   public delete(url: string, observe?, responseType?) {
  //     let accessToken = this._cookieService.get('accessToken') || '';
  //     let headers = new HttpHeaders({
  //       'Content-type': 'application/json',
  //       token: accessToken
  //     });
  //     let params = { headers: headers };
  //     if (observe == 'response') params['observe'] = 'response';
  //     if (responseType == 'text') params['responseType'] = 'text';

  //     return this._httpClient.delete(this._baseUrl + url, params);
  //   }

  //   public checkAccessToken() {
  //     return this.get('check/token', 'response', 'text').pipe(
  //       map(data => {
  //         return true;
  //       }),
  //       catchError((err, caught) => {
  //         return this._getAccessToken();
  //       })
  //     );
  //   }

  //   private _getAccessToken() {
  //     let accessToken = this._cookieService.get('accessToken') || '';
  //     let refreshToken = this._cookieService.get('refreshToken') || '';
  //     let headers = new HttpHeaders({
  //       'Content-type': 'application/json',
  //       token: accessToken,
  //       refreshToken: refreshToken
  //     });
  //     return this._httpClient.get(this._baseUrl + 'refresh/token', { headers: headers }).pipe(
  //       map(data => {
  //         this._updateCookies(data);
  //         return true;
  //       }),
  //       catchError((err, caught) => {
  //         this._router.navigate(['/login']);
  //         return of(false);
  //       })
  //     );
  //   }
  //   /**
  //    *
  //    * @param data
  //    */
  //   private _updateCookies(data) {
  //     this._cookieService.put('accessToken', data.token);
  //     this._cookieService.put('refreshToken', data.refreshToken);
  //   }
}
