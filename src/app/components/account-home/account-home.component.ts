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
import { User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { UsernameFromEmailPipe } from '../../pipes/username.pipe';

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    FormsModule, 
    UsernameFromEmailPipe
  ],
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent implements OnInit {
  email: string = '';
  tickets: any[] = [];

  constructor(
    public userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    const user: User | null = this.userService.getCurrentUser();
    if (user) {
      this.email = user.email || '';
      //this.tickets = await this.userService.getUserTickets(); TODO: implementálni kell a Firestore-ból való lekérdezést
    }
  }

  async logout() {
    await this.userService.logout();
    this.snackBar.open('Sikeres kijelentkezés!', 'Bezár', { duration: 3000 });
    this.router.navigate(['/account']);
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