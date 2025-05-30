import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { isLoggedGuard} from './guards/is-logged-guard.guard';
import { redirectLogged } from './guards/redirect-logged.guard';
import { EntrysComponent } from './pages/entrys/entrys.component';

export const routes: Routes = [
    {path:'',component:LoginComponent, title:'Login',canActivate:[redirectLogged]},
    {path:'users',component:UsersComponent, title:'Users'},
    {path:'products',component:ProductsComponent, title:'Products'},
    {path:'entrys',component:EntrysComponent,title: 'entrys'}
];
