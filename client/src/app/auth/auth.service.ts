import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  currentUser = {};

  constructor(private http: Http, private router: Router) { }

  signin(username: string, password: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8082/login', JSON.stringify(
        { username: username, password: password }), options)
        .map((response) => {
            const user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', 'qqq');
                this.currentUser = user;
            }

            return user;
        });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }

}
