import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtToken } from '../models/authentication/jwt-token';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public decodedToken: JwtToken | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId); // Check if running in the browser
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  decodeToken(): JwtToken | null {
    const token = this.getToken();

    if (token) {
      const helper = new JwtHelperService();
      try {
        const decoded = helper.decodeToken(token) as JwtToken;
        this.decodedToken = decoded;
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
      this.decodeToken();
    }
  }

  saveRefreshToken(refreshToken: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const helper = new JwtHelperService();
    return token ? !helper.isTokenExpired(token) : false;
  }

  removeAuth(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.decodedToken = null;
    }
  }

  hasRole(role: string): boolean {
    const decodedToken = this.decodeToken();
    const userRole = decodedToken?.role;

    if (userRole) {
      return userRole.toLowerCase() === role.toLowerCase();
    }
    return false;
  }
}
// isBrowser() Method: This method checks whether the code is running in the browser. 
// It's used in each method that accesses localStorage to ensure those methods only run in the browser.

// PLATFORM_ID and isPlatformBrowser: These are Angular tools that help you determine if the current platform is the browser.
//  When rendering on the server (e.g., using Angular Universal), the check will prevent the code that uses localStorage from executing, 
// which solves the localStorage is not defined error.