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

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) {}

  searchTrains() {
    this.filteredTrains = this.trains.filter(train =>
      train.departure.toLowerCase().includes(this.departureStation.toLowerCase()) &&
      train.arrival.toLowerCase().includes(this.arrivalStation.toLowerCase())
    );
    this.searchPerformed = true;
  }
  bookTrain(train: any) {}

  /*
  async bookTrain(train: any) {
    const userData = this.userService.getCurrentUser();
    if (!userData) {
      alert('Csak bejelentkezett felhasználók foglalhatnak jegyet.');
      this.router.navigate(['/account']);
      return;
    }
  
    const finalPrice = (train.price * (1 - this.discountPercentage / 100)).toFixed(0);
  
    if (confirm(
      `Biztosan le szeretnéd foglalni a(z) ${train.departure} - ${train.arrival} vonatot ${train.time} időpontban?\n` +
      `Kedvezmény: ${this.discountPercentage}%\nVégső ár: ${finalPrice} Ft`
    )) {
      const ticket = {
        ...train,
        price: finalPrice,
        discountApplied: this.discountPercentage,
        bookedAt: new Date().toISOString()
      };
  
      try {
        await this.userService.addTicket(ticket);
        this.snackBar.open('Foglalás sikeres! Jegy elmentve.', 'Bezár', { duration: 3000 });
      } catch (err) {
        console.error('Hiba a jegy mentése közben:', err);
        this.snackBar.open('Hiba történt a foglalás során.', 'Bezár', { duration: 3000 });
      }
    }
  }
    */
}