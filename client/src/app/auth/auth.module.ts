import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { AuthComponent } from './auth.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiService } from './../shared/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ AuthComponent ],
  providers: [ AuthGuard, AuthService, ApiService ],
})
export class AuthModule { }
