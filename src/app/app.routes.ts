import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/home/categories/categories.component';
import { ProductsComponent } from './components/home/products/products.component';
import { ForgotComponent } from './components/auth/forgot/forgot.component';
import { AuthGuard } from './guards/authguards';
import { UsersComponent } from './components/dashboard/users/user.component';
import { GuestGuard } from './guards/guestguards';
import { UsrProfileComponent } from './components/dashboard/userprofile/usrprofile.component';
import { MetricsDashboardComponent } from './components/dashboard/metrics/metrics.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
    { path: 'forgotpassword', component: ForgotComponent, canActivate: [GuestGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'usrprofile', component: UsrProfileComponent, canActivate: [AuthGuard] },
    { path: 'metrics', component: MetricsDashboardComponent, canActivate: [AuthGuard] }
];
