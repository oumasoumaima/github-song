import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPwdComponent } from './component/forgot-pwd/forgot-pwd.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'forgot-pwd', component: ForgotPwdComponent},
  {path: 'home', component:HomeComponent },
  {path: 'about', component:AboutComponent },
  {path: '', redirectTo:'',pathMatch:'full'},
  {path: 'admin', 
  canActivate: [AuthGuard],
  loadChildren: () => 
    import('./modules/admin/admin.module').then((m) => m.AdminModule)},
  {path: '**', component:NotFoundComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
