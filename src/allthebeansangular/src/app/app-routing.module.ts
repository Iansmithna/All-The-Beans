import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBeanComponent } from './add-bean/add-bean.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBeanComponent } from './edit-bean/edit-bean.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'dashboard/add', component: AddBeanComponent, canActivate: [AuthGuard] },
  {path: 'dashboard/edit/:id', component: EditBeanComponent, canActivate: [AuthGuard] }
];
//, {useHash: true})],
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
