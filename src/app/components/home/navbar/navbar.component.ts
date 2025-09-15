import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../../services/jwt.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationStart } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.sevice';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, CommonModule, TranslateModule],
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isMobile: boolean = false;
  isMenuOpened: boolean = false;
  private routerSubscription: Subscription | null = null;
  userId: string | null = null;
  userRole: string | null = null;
  currentLang: string = 'en';
  navLinks: any[] = []; // Array to store the links based on role

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';
  }

  ngOnInit(): void {
    this.checkIfMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.checkIfMobile);
    }
    this.checkAuth();
    this.getUserDetails();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.checkAuth();
        this.getUserDetails();  // To check role on navigation
        this.updateNavLinks();  // Update the nav links based on the role
      }
    });
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('language', lang);
  }

  getUserDetails(): void {
    const decodedToken = this.jwtService.decodeToken();
    if (decodedToken) {
      this.userId = decodedToken.sub;
      this.userRole = decodedToken.role;
    }
    this.updateNavLinks(); // Update navigation links after fetching the user role
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.checkIfMobile);
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkIfMobile = () => {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.isMenuOpened = false;
      }
    }
  };
  hasAdminOrUserRole(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'User';
  }
  IsAdmin(): boolean {
    return this.userRole === 'Admin'
  }
  logOut() {
    this.jwtService.removeAuth();
    this.jwtService.isAuthenticated();
    this.hasAdminOrUserRole();
    this.IsAdmin();
    this.router.navigate(['/login']);
  }

  checkAuth() {
    this.isAuthenticated = this.jwtService.isAuthenticated();
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  closeMenu() {
    this.isMenuOpened = false;
  }

  updateNavLinks() {
    if (this.userRole === 'admin') {
      this.navLinks = [
        { path: '/admin-dashboard', label: 'Admin Dashboard' },
        { path: '/manage-users', label: 'Manage Users' },
        { path: '/profile', label: 'Profile' },
        { path: '/logout', label: 'Logout' }
      ];
    } else if (this.userRole === 'user') {
      this.navLinks = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/profile', label: 'Profile' },
        { path: '/logout', label: 'Logout' }
      ];
    } else {
      this.navLinks = [
        { path: '/login', label: 'Login' },
        { path: '/register', label: 'Register' }
      ];
    }
  }
}
