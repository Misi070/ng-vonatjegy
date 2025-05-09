import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
import { TrainService } from '../../services/train.service';
import { Timestamp } from 'firebase/firestore';
import { Train } from '../../models/train';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, DiscountPipe, MatOptionModule, MatSelectModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements AfterViewInit {

  @ViewChild('departureInput', { static: true }) departureInput!: ElementRef;

  departureStation: string = '';
  arrivalStation: string = '';
  trains: Train[] = [];
  filteredTrains: Train[] = [];
  searchPerformed: boolean = false;

  discountPercentage: number = 0;
  discountOptions: number[] = [0, 50, 70, 100];

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private ticketService: TicketService,
    private trainService: TrainService
  ) {}

  ngOnInit(): void {
    this.loadTrainsFromFirestore();
  }

  ngAfterViewInit(): void {
    if (this.departureInput) {  
      setTimeout(() => {   
        this.departureInput.nativeElement.focus();   
      });
    }
  }


  searchTrains(): void {
    const from = this.departureStation.trim().toLowerCase();
    const to = this.arrivalStation.trim().toLowerCase();

    this.filteredTrains = this.trains.filter(train =>
      train.departure.toLowerCase().includes(from) &&
      train.arrival.toLowerCase().includes(to)
    );
    this.searchPerformed = true;
  }

  async bookTrain(train: Train): Promise<void> {
    const user = this.userService.getCurrentUser();
    if (!user) {
      this.snackBar.open('Csak bejelentkezett felhasználók foglalhatnak jegyet.', 'Bezár', { duration: 3000 });
      this.router.navigate(['/account']);
      return;
    }

    const finalPrice = Math.round(train.price * (1 - this.discountPercentage / 100));

    const confirmed = confirm(
      `Biztosan lefoglalod a(z) ${train.departure} - ${train.arrival} vonatot ` +
      `${(train.time instanceof Date ? train.time : (train.time as Timestamp).toDate()).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })} időpontban?\n` +
      `Kedvezmény: ${this.discountPercentage}%\nVégső ár: ${finalPrice} Ft`
    );

    if (!confirmed) return;

    const ticket: Ticket = {
      from: train.departure,
      to: train.arrival,
      departureTime: Timestamp.fromDate(
        train.time instanceof Date ? train.time : (train.time as Timestamp).toDate()
      ),
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

  async loadTrainsFromFirestore(): Promise<void> {
    try {
      const trains = await this.trainService.getAllTrains();
      this.trains = trains.map(train => ({
        ...train,
        time: (train.time instanceof Timestamp) ? train.time.toDate() : train.time // Firestore Timestamp -> JS Date
      }));
    } catch (err) {
      console.error('Nem sikerült betölteni a vonatokat:', err);
      this.snackBar.open('Nem sikerült betölteni a vonatokat.', 'Bezár', { duration: 3000 });
    }
  }
}
