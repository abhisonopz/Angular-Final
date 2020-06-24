import { OtpComponent } from './otp/otp.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProductListComponent } from './productlist/productlist.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'otp', component: OtpComponent},
  {path: 'productlist', component: ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
