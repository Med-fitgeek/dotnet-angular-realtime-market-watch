import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']   // ← doit pointer ici
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router,  private zone: NgZone) {}

  onLogin() {
  this.authService.login({ email: this.email, password: this.password }).subscribe({
    next: (res) => {
      this.authService.saveToken(res.token);
      console.log('[LOGIN] Token sauvé :', res.token); 
      this.zone.run(() => this.router.navigate(['/chat']));
    },
    error: () => {
      this.error = 'Email ou mot de passe invalide.';
    }
  });
}

}
