import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { ApiService } from './../shared/api.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private apiService: ApiService, private router: Router) {}

  signin(email: string, password: string) {
    return this.apiService.post('/login', { email: email, password: password })
      .map(res => localStorage.setItem('session', 'wodkg5pdsm42'));
  }

  getUsers(): Observable<any> {
    return this.apiService.get('/login');
  }

  logout(): void {
    localStorage.removeItem('session');
    this.router.navigate(['/signin']);
  }
}







// import { Injectable } from '@angular/core';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

// @Injectable()
// export class AuthService {
//   currentUser = {};

//   constructor(private http: Http, private router: Router) { }

//   signin(username: string, password: string) {
//     const headers = new Headers({'Content-Type': 'application/json'});
//     const options = new RequestOptions({ headers: headers });

//     return this.http.post('http://localhost:8082/login', JSON.stringify(
//         { username: username, password: password }), options)
//         .map((response) => {
//             const user = response.json();
//             if (user && user.token) {
//                 localStorage.setItem('currentUser', 'qqq');
//                 this.currentUser = user;
//             }

//             return user;
//         });
//   }



// }
