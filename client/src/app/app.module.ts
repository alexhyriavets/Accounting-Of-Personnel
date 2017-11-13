import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-router.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './shared/add-employee/add-employee.component';
import { MenuComponent } from './menu/menu.component';

import { EmployeeService } from './shared/employee.service';
import { AuthService } from './auth/auth.service';

import { FilterPipe } from './employees-list/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    MenuComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRouterModule,
    FormsModule,
    HttpModule,
    AuthModule,
  ],
  entryComponents: [ AddEmployeeComponent ],
  providers: [ EmployeeService, HttpModule, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
