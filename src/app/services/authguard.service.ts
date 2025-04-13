import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const userData = this.userService.getUserData();
    if (userData) {
      return true;
    } else {
      this.router.navigate(['/account']); 
      return false;
    }
  }
}