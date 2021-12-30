import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NotAuthGuard } from './guards/notAuth/not-auth.guard';
import { LoginComponent } from './views/login/login.component';

import { NotAuthGuard } from './guards/notAuth/not-auth.guard';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
