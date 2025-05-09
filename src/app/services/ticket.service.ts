import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { doc, deleteDoc } from 'firebase/firestore';
import { Ticket } from '../models/ticket';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private firestore: Firestore, private userService: UserService) {}

  async bookTicket(ticketData: Ticket): Promise<void> {
    const user = this.userService.getCurrentUser();
    if (!user) throw new Error('Nincs bejelentkezve felhasználó');

    const ticket = {
      ...ticketData,
      userEmail: user.email,
      timestamp: new Date().toISOString()
    };

    const ticketsRef = collection(this.firestore, 'tickets');
    await addDoc(ticketsRef, ticket);
  }

  async getTicketsForCurrentUser(): Promise<Ticket[]> {
    const user = this.userService.getCurrentUser();
    if (!user?.email) return [];

    const q = query(collection(this.firestore, 'tickets'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as Ticket;
      return {
        id: doc.id,
        ...data
      };
    });
  }
  
  async deleteTicketById(ticketId: string): Promise<void> {
    const ticketDocRef = doc(this.firestore, 'tickets', ticketId);
    await deleteDoc(ticketDocRef);
  }
}
