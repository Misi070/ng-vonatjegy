import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookingComponent } from './components/booking/booking.component';
import { AccountComponent } from './components/account/account.component';
import { AccountHomeComponent } from './components/account-home/account-home.component';
import { AccountRegisterComponent } from './components/account-register/account-register.component';
import { AuthguardService } from './services/authguard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account-home', component: AccountHomeComponent, canActivate:[AuthguardService]},
  { path: 'account-register', component: AccountRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

