import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async canActivate(): Promise<boolean> {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      this.snackBar.open(
        'Először jelentkezz be!',
        'Bezár',
        { duration: 3000 }
      );
      this.router.navigate(['/account']);
      return false;
    }
    
    return true;
  }
}
