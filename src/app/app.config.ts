import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBh2Z0r3FLO_9hhMhQ4yCHoFCGX5q_FbkU",
      authDomain: "ng-vonatjegy.firebaseapp.com",
      projectId: "ng-vonatjegy",
      storageBucket: "ng-vonatjegy.appspot.com",
      messagingSenderId: "378511793557",
      appId: "1:378511793557:web:335ae47fef7fe345a12a9c"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
