import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';

import { AuthGuard } from './auth/auth.guard';
import { AddEmployeeComponent } from './shared/add-employee/add-employee.component';

const routes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: 'list', component: EmployeesListComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: AuthComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'add', component: AddEmployeeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRouterModule { }
