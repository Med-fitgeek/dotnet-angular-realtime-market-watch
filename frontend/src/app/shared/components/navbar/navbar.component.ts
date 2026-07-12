import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuOpen = signal(false);

  // Signals directement depuis le service — pas de subscription manuelle
  isLoggedIn = this.auth.isLoggedIn;
  username   = this.auth.username;

  constructor(private auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  logout() {
    this.menuOpen.set(false);
    this.auth.logout(); // redirige déjà vers /login dans le service
  }
}