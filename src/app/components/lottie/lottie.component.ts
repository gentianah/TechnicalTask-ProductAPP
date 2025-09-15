import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationOptions } from 'ngx-lottie';
import { LottieComponent } from 'ngx-lottie';
import animationData from './../../../assets/animation.json'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lottie',
  standalone: true,
  imports: [
    CommonModule,
    LottieComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.css'],
})
export class LottieAnimationComponent {
  option: AnimationOptions | null = null;
  isBrowser: boolean = false;

  
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.option = { animationData: animationData };
    }
  }
  async ngOnInit(): Promise<void> {
    if (this.isBrowser) {
      try {
        this.option = { animationData: animationData };
      } catch (error) {
        console.error("Error initializing animation:", error);
      }
    }
  }
  
  

  animationCreated(animationItem: AnimationItem): void {
  }
}
