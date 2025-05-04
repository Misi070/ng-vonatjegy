import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.router.navigate(['/account-home']);
    }
  }

  async onSubmit() {
    try {
      const credential = await this.userService.login(this.email, this.password);

      const uid = credential.user.uid;

      this.snackBar.open('Sikeres bejelentkezés', 'Bezár', { duration: 3000 });
      this.router.navigate(['/account-home']);
    } catch (error) {
      console.error('Login error:', error);
      this.snackBar.open('Hibás e-mail vagy jelszó', 'Bezár', { duration: 3000 });
    }
  }
}
