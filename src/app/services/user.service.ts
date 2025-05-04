// user.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser$: Observable<User | null>;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    this.currentUser$ = authState(this.auth);
  }

  // ✅ Regisztráció: csak Firebase Auth fiók létrehozása
  async register(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ Firestore dokumentum mentése regisztráció után
  async saveUserDataToFirestore(uid: string, username: string, email: string): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userData = {
      username: username,
      email: email,
      tickets: []  // Kezdetben üres jegylista
    };
    await setDoc(userDocRef, userData);
  }

  // ✅ Bejelentkezés
  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ Kijelentkezés
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  // ✅ Aktuális felhasználó objektum
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
