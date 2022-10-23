import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_service/auth.guard';
import { HomeComponent } from './segments/home/home.component';
import { LoginComponent } from './segments/login/login.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CompanyComponent } from './segments/company/company.component';
import { DriverComponent } from './segments/driver/driver.component';
import { CompanyDetailsComponent } from './segments/company-details/company-details.component';
import { DriverDetailsComponent } from './segments/driver-details/driver-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'companies', component: CompanyComponent, canActivate: [AuthGuard] },
      { path: 'drivers', component: DriverComponent, canActivate: [AuthGuard] },
      { path: 'companies/:name', component: CompanyDetailsComponent, canActivate: [AuthGuard] },
      { path: 'drivers/:name', component: DriverDetailsComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
