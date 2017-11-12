import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from './../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  public user: User;
  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.user = {
      username: '',
      password: '',
    };
  }

  // here i can easy add an validation
  signin() {
    this.authService.signin(this.user.username, this.user.password)
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
          alert(error);
      });
  }

}
