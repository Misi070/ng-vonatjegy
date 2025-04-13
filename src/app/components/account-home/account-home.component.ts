import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatSnackBarModule, MatToolbarModule, FormsModule ],
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent implements OnInit {
  username: string = '';
  email: string = '';
  tickets: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const userData = this.userService.getUserData();
    if (userData) {
      this.username = userData.username;
      this.email = userData.email;
      this.tickets = userData.tickets || [];
    }
  }

  logout() {
    this.userService.setUserData(null);
    this.snackBar.open('Sikeres kijelentkezés!', 'Bezár', { duration: 3000 });
    this.router.navigate(['/account']);
  }

  deleteTicket(index: number) {
    this.tickets.splice(index, 1);
    const user = this.userService.getUserData();
    if (user) {
      user.tickets = this.tickets;
      this.userService.setUserData(user);
    }
  }

  goToBooking() {
    this.router.navigate(['/booking']);
  }

  getDiscountClass(discount: number): string {
    if (discount === 100) {
      return 'discount-full';
    } else if (discount === 70) {
      return 'discount-high';
    } else if (discount === 50) {
      return 'discount-medium';
    } else {
      return 'discount-none';
    }
  }
  
}
