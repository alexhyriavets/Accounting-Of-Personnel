import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  signin(username: string, password: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8081/login', JSON.stringify(
        { username: username, password: password }), options)
        .map((response) => {
            // login successful if there's a jwt token in the response
            console.log(response);
            const user = response.json();
            console.log(user);
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

}
