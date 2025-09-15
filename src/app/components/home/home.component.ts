import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string | null = null;
  userRole: string | null = null;
  constructor(private jwtService: JwtService, private translate: TranslateService) {
    this.translate.setDefaultLang('de');
  }
  ngOnInit(): void {
      this.getUsername();
  }
  getUsername(): void {
    const decodedToken = this.jwtService.decodeToken();

    if (decodedToken) {
      this.userName = decodedToken.username;  
      this.userRole = decodedToken.role; 
    }
  }
  getGreeting(): string {
    const currentHour = new Date().getHours();
    const isMorning = currentHour < 12;
    const greetingKey = isMorning ? 'GoodMorning' : 'GoodAfternoon';

  const greeting = this.translate.instant(greetingKey);
    if (this.userRole === 'Admin') {
      return `${greeting}, Admin`;
    } else {
      return `${greeting} ${this.userName}`;
    }
  }

}
