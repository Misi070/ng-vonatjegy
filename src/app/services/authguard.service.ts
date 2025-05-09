import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const currentUser = await firstValueFrom(this.userService.currentUser$);

    if (!currentUser) {
      this.snackBar.open('Először jelentkezz be!', 'Bezár', { duration: 3000 });
      return this.router.createUrlTree(['/account']);
    }

    return true;
  }
}
