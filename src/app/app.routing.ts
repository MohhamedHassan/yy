import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { AboutussComponent } from './aboutuss/aboutuss.component';
import { UpdateimgComponent } from './updateimg/updateimg.component';

const routes: Routes =[
  {
     path:'auth',
     component:AuthComponent
  },
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full',
  },
  {
    path:'upimg',
    component:UpdateimgComponent
 },
  {
    path:'login',
     component:LoginComponent
  },
  {
    path:'about',
     component:AboutussComponent
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
