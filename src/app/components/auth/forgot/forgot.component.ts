import { Component} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { LottieAnimationComponent } from '../../lottie/lottie.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [
    RouterLink,
    LottieAnimationComponent,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule
  ],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent {

}
