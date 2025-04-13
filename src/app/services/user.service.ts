import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;
  private users: any[] = [];

  constructor(private http: HttpClient) {}

  // Beállítja az aktuális felhasználót (login/regisztráció után)
  setUserData(data: any) {
    this.userData = data;
  }

  // Visszaadja az aktuális bejelentkezett felhasználót
  getUserData() {
    return this.userData;
  }

  // Betölti a felhasználókat az assets/users.json fájlból (csak egyszer)
  async getUsers(): Promise<any[]> {
    if (this.users.length > 0) {
      return this.users;
    }

    const response = await lastValueFrom(this.http.get<any[]>('/assets/files/users.json'));
    this.users = response;
    return this.users;
  }

  // Hozzáad egy új felhasználót és frissíti a memóriában tárolt listát
  async addUser(newUser: any): Promise<void> {
    if (this.users.length === 0) {
      await this.getUsers();
    }

    this.users.push(newUser);

    // Mivel fájlba nem tudunk közvetlenül írni Angularban,
    // itt *szimuláljuk* az írást memóriában – később Firebase fogja kezelni.

    console.warn('Ez a felhasználó csak memóriába lett mentve, nem fájlba:', newUser);
  }

  addTicket(ticket: any): void {
    const userData = this.getUserData();
    userData.tickets = userData.tickets || [];
    userData.tickets.push(ticket);
    this.setUserData(userData);
  }
  
}
