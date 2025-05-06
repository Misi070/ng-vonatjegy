import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  currentUser$: Observable<User | null>;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    this.currentUser$ = authState(this.auth);
  }

  async register(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async saveUserDataToFirestore(uid: string, username: string, email: string): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userData = {
      username: username,
      email: email,
      tickets: []
    };
    await setDoc(userDocRef, userData);
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  async getUserTickets(): Promise<any[]> {
    const user = this.getCurrentUser();
    if (!user?.email) return [];

    const ticketsRef = collection(this.firestore, 'tickets');
    const q = query(ticketsRef, where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as any
    }));
  }
}
