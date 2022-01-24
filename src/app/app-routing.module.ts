import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NotAuthGuard } from './guards/notAuth/not-auth.guard';
import { LoginComponent } from './views/login/login.component';

import { NotAuthGuard } from './guards/notAuth/not-auth.guard';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { RegisterComponent } from './views/register/register.component';
import { ChatComponent } from './components/Chat/chat.component';
import { RestaurantComponent } from './views/restaurant/restaurant.component';
import { CheckoutComponent } from './views/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'restaurant/:restaurantID',
    component: RestaurantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
