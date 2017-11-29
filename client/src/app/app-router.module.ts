import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';
import { AddEmployeeComponent } from './shared/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './employees-list/employee-detail/employee-detail.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: 'list', component: EmployeesListComponent },
    { path: 'signin', component: AuthComponent },
    { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddEmployeeComponent },
    { path: 'detail/:tab', component: EmployeeDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ],
})
export class AppRouterModule { }
