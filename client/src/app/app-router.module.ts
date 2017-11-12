import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: EmployeesListComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: AuthComponent }
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
