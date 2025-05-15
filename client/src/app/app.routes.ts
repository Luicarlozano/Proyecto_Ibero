import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {path:'',component:LoginComponent, title:'Login'},
    {path:'users',component:UsersComponent, title:'Users'},
];
