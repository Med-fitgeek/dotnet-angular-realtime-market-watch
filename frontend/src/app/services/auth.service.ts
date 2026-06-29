import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private apiUrl = 'http://localhost:5099/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  private loggedIn = false;

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string, username: string }>(`${this.apiUrl}/login`, credentials)
    .pipe(
      tap(response => {
        this.saveToken(response.token);
        this.setLoggedIn(true);
        this.saveUsername(response.username);
      })
    );
  }
  
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (!exp) return false;

      // Vérifie si le token a expiré
      const currentTime = Math.floor(Date.now() / 1000);
      return exp > currentTime;
    } catch (e) {
      console.error('Token invalide', e);
      return false;
    }
  }


  register(credentials: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, credentials)
  }  
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  saveUsername(username: string) {
    localStorage.setItem('username', username);
  }

  getToken(): string | null {
  return localStorage.getItem('auth_token');
  }
}
