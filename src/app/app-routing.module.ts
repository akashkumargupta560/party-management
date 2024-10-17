import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'', redirectTo:'dashboard', pathMatch:'full'
  },
  {
    path:'dashboard',
    loadChildren:() => import('./dashboard/dashboard.module').then((m)=>m.DashboardModule)
  },
  {
    path:'login', component:LoginComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
