import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  images: string[] = [
    '/assets/images/image1.jpg',
    '/assets/images/image2.jpg',
    '/assets/images/image3.jpg',
  ];
  currentImage: string = ''; // Inicializáljuk a currentImage property-t
  currentIndex: number = 0;

  ngOnInit() {
    this.currentImage = this.images[this.currentIndex];
    this.startImageRotation();
  }

  startImageRotation() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 10000); // 10000 ms = 10 seconds
  }
}

