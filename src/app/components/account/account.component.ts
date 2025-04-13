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

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const user = this.userService.getUserData();
    if (user) {
      this.router.navigate(['/account-home']);
    }
  }

  async onSubmit() {
    const users = await this.userService.getUsers();
    const user = users.find(
      u => u.username === this.username && u.password === this.password
    );

    if (user) {
      alert('Sikeres bejelentkezés');
      this.userService.setUserData(user);
      this.router.navigate(['/account-home']);
    } else {
      alert('Hibás felhasználónév vagy jelszó');
    }
  }
}
