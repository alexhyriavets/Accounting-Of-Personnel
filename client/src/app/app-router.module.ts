import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: 'list', component: EmployeesListComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: AuthComponent },
    { path: 'menu', component: MenuComponent }
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
