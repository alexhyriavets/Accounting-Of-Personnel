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
  public errors: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.user = {
      email: '',
      password: '',
    };
  }

  // just signin, no matter what authService will return
  signin() {
    this.authService.signin(this.user.email, this.user.password)
      .subscribe(
        data => this.router.navigate([this.returnUrl]),
        error => this.errors = `This combination of email and password doesn't exist. Please try again.`
      );
  }

}
