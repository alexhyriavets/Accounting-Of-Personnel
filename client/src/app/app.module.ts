import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-router.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './shared/add-employee/add-employee.component';

import { EmployeeService } from './shared/employee.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRouterModule,
    FormsModule,
    HttpModule,
  ],
  entryComponents: [ AddEmployeeComponent ],
  providers: [ EmployeeService, HttpModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
