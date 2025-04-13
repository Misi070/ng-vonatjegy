import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-account-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule, MatToolbarModule],
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})

export class AccountRegisterComponent {
  user: { username: string; email: string } | null = null;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private userService: UserService) {}

  // Itt történik az automatikus átirányítás, ha már be van jelentkezve
  ngOnInit() {
    const user = this.userService.getUserData();
    if (user) {
      this.router.navigate(['/account-home']);
    }
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('A jelszavak nem egyeznek meg!');
      return;
    }

    // Felhasználói adatok mentése a UserService-ben, TODO adatbázisba mentés
    const newUser = { username: this.username, email: this.email, password: this.password, tickets: [] };
      this.userService.addUser(newUser).then(() => {
      this.userService.setUserData({ username: this.username, email: this.email, tickets: [] });
      alert('Sikeres regisztráció!');
      this.router.navigate(['/account-home']);
      }).catch((err) => {
        alert('Hiba történt a regisztráció során.');
      });
  }
}