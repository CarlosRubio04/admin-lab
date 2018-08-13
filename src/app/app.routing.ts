import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SinginComponent } from './singin/singin.component';
import { ProfileComponent } from './profile/profile.component';


import { MyGuard } from './services/my-guard.service.guard';

//import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'login',            component: LoginComponent },
    { path: 'singin',           component: SinginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [MyGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
