import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from '../app/register/register.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {LoginComponent} from './login/login.component'
import {ForgotComponent} from './forgot/forgot.component'
import {TeamComponent} from './team/team.component'
import{TeamdetailComponent} from './teamdetail/teamdetail.component'
import {AuthGuard} from './guard/auth.guard'

const routes: Routes = [
  {path: '' , component: RegisterComponent},
  {path: 'dashboard' , component: DashboardComponent , canActivate:[AuthGuard]},
  {path: 'login' , component: LoginComponent},
  {path: 'forgot' , component: ForgotComponent},
  {path: 'dashboard/team' , component: TeamComponent , canActivate:[AuthGuard]},
  {path: 'team/:id' , component: TeamdetailComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
