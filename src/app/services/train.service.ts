// services/train.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Train } from '../models/train';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private trainsCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.trainsCollection = collection(this.firestore, 'trains');
  }

  async getAllTrains(): Promise<Train[]> {
    const snapshot = await getDocs(this.trainsCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        time: data['time'].toDate() // Timestamp -> Date
      } as Train;
    });
  }
}
