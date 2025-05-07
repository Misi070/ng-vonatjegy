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
import { EmailPipe } from '../../pipes/email.pipe';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatSnackBarModule, MatToolbarModule, FormsModule, EmailPipe],
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent implements OnInit {
  email: string = '';
  username: string = '';
  tickets: any[] = [];

  constructor(
    public userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private ticketService: TicketService
  ) {}

  async ngOnInit() {
    const user: User | null = this.userService.getCurrentUser();
    if (user) {
      this.email = user.email || '';
      try {
        const userProfile = await this.userService.getUserProfile(user.uid);
        this.username = userProfile?.username || '';
        this.tickets = await this.userService.getUserTickets();
        console.log('Lekérdezett jegyek:', this.tickets);  // Debug
      } catch (error) {
        console.error('Hiba a jegyek betöltése közben:', error);
        this.snackBar.open('Hiba történt a jegyek betöltésekor.', 'Bezár', { duration: 3000 });
      }
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

  async deleteTicket(index: number): Promise<void> {
    const ticket = this.tickets[index];
    const confirmed = confirm(`Biztosan törölni szeretnéd a(z) ${ticket.from} → ${ticket.to} jegyet?`);
  
    if (confirmed) {
      await this.ticketService.deleteTicketById(ticket.id);
      this.tickets.splice(index, 1); 
    }
  }
}
