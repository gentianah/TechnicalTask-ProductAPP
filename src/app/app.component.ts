import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { ProductService } from './services/products.service';
import { CategoryService } from './services/category.service';
import { ToastrModule } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    CommonModule,
    RouterOutlet,
    ToastrModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    ApiService,
    ProductService,
    CategoryService,
    ToastrModule
  ]
})
export class AppComponent {
  title = 'TechnicalTask-ProductAPP';

  constructor(private translate: TranslateService) {
    this.configureTranslations();
  }

  private configureTranslations() {
    this.translate.addLangs(['en', 'de']); 
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|de/) ? browserLang : 'en'); 
  }
}
