import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './shared/add-employee/add-employee.component';
import { MenuComponent } from './menu/menu.component';
import { ShowErrorsComponent } from './shared/show-errors';
import { EmployeeDetailComponent } from './employees-list/employee-detail/employee-detail.component';

import { EmployeeService } from './shared/employee.service';
import { ApiService } from './shared/api.service';
import { AuthService } from './auth/auth.service';
import { SubdivisionService } from './shared/subdivision.service';
import { ExcelService } from './shared/excel.service';

import { FilterPipe } from './employees-list/filter.pipe';
import { DismissalFilterPipe } from './employees-list/filter.pipe';
import { RetirementFilterPipe } from './employees-list/filter.pipe';
import { SubdivFilterPipe } from './employees-list/filter.pipe';
import { FilterSubPipe } from './staffing/filter-sub.pipe';
import { StaffingComponent } from './staffing/staffing.component';
import { StaffingDetailComponent } from './staffing/staffing-detail/staffing-detail.component';
import { PositionDetailComponent } from './staffing/position-detail/position-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    MenuComponent,
    FilterPipe,
    FilterSubPipe,
    SubdivFilterPipe,
    DismissalFilterPipe,
    RetirementFilterPipe,
    ShowErrorsComponent,
    EmployeeDetailComponent,
    StaffingComponent,
    StaffingDetailComponent,
    PositionDetailComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRouterModule,
    FormsModule,
    HttpModule,
    AuthModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ AddEmployeeComponent ],
  providers: [ EmployeeService, HttpModule, AuthService, ApiService, SubdivisionService, ExcelService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
