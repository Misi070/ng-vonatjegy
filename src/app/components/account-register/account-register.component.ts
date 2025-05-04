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
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.router.navigate(['/account-home']);
    }
  }

  async onSubmit() {
    // Reset error message at the start of each attempt
    this.errorMessage = '';
    
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'A jelszavak nem egyeznek meg!';
      return;
    }

    if (!this.email || !this.password || !this.username) {
      this.errorMessage = 'Minden mezőt ki kell tölteni!';
      return;
    }

    this.loading = true;
    try {
      // 1. Firebase Auth fiók létrehozása
      const userCredential = await this.userService.register(this.email, this.password);
      const uid = userCredential.user.uid;
      
      await this.userService.saveUserDataToFirestore(uid, this.email, this.email);

      // 2. Sikeres regisztráció esetén navigálás
      alert('Sikeres regisztráció!');
      this.router.navigate(['/account-home']);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Ez az email már használatban van.';
      } else {
        this.errorMessage = 'Hiba történt a regisztráció során, próbáld újra!';
      }
    } finally {
      this.loading = false;  // Betöltés állapot végén
    }
  }
}
