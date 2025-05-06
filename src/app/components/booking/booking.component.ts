import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { TicketService } from '../../services/ticket.service'; 

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, DiscountPipe, MatOptionModule, MatSelectModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  departureStation: string = '';
  arrivalStation: string = '';
  filteredTrains: any[] = [];
  searchPerformed: boolean = false;

  discountPercentage: number = 0; // Kezdeti kedvezmény, ha nincs beállítva, akkor nulla
  //Fix kedvezmények, amiket a felhasználó választhat
  discountOptions: number[] = [0, 50, 70, 100];

  trains = [
    { departure: 'Budapest', arrival: 'Szeged', time: '08:00', price: 5000 },
    { departure: 'Budapest', arrival: 'Szeged', time: '09:00', price: 5000 },
    { departure: 'Budapest', arrival: 'Debrecen', time: '09:00', price: 6000 },
    { departure: 'Szeged', arrival: 'Budapest', time: '10:00', price: 5000 },
    { departure: 'Szeged', arrival: 'Budapest', time: '10:00', price: 5000 },
    { departure: 'Debrecen', arrival: 'Budapest', time: '11:00', price: 6000 }
  ];

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar, private ticketService: TicketService) {}

  searchTrains() {
    this.filteredTrains = this.trains.filter(train =>
      train.departure.toLowerCase().includes(this.departureStation.toLowerCase()) &&
      train.arrival.toLowerCase().includes(this.arrivalStation.toLowerCase())
    );
    this.searchPerformed = true;
  }
  async bookTrain(train: any) {
    const user = this.userService.getCurrentUser();
    if (!user) {
      this.snackBar.open('Csak bejelentkezett felhasználók foglalhatnak jegyet.', 'Bezár', { duration: 3000 });
      this.router.navigate(['/account']);
      return;
    }
  
    const finalPrice = Math.round(train.price * (1 - this.discountPercentage / 100));
  
    const confirmed = confirm(
      `Biztosan lefoglalod a(z) ${train.departure} - ${train.arrival} vonatot ${train.time} időpontban?\n` +
      `Kedvezmény: ${this.discountPercentage}%\nVégső ár: ${finalPrice} Ft`
    );
  
    if (!confirmed) return;
  
    const ticket = {
      from: train.departure,
      to: train.arrival,
      departureTime: train.time,
      basePrice: train.price,
      discount: this.discountPercentage,
      finalPrice: finalPrice
    };
  
    try {
      await this.ticketService.bookTicket(ticket);
      this.snackBar.open('Foglalás sikeres! Jegy elmentve.', 'Bezár', { duration: 3000 });
    } catch (err) {
      console.error('Hiba történt a jegy mentése során:', err);
      this.snackBar.open('Hiba történt a foglalás során.', 'Bezár', { duration: 3000 });
    }
  }
  
}