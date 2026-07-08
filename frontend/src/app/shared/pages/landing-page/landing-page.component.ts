import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingComponent {
  isLoggedIn = this.auth.isLoggedIn;

  constructor(private auth: AuthService) {}

  readonly features = [
    {
      icon: '⚡',
      title: 'Temps réel',
      desc: 'Prix mis à jour toutes les secondes via SignalR WebSocket.'
    },
    {
      icon: '🔔',
      title: 'Alertes personnalisées',
      desc: 'Soyez notifié instantanément quand un seuil est atteint.'
    },
    {
      icon: '📊',
      title: 'Multi-actifs',
      desc: 'Suivez actions, crypto, forex et matières premières.'
    },
    {
      icon: '🔒',
      title: 'Sécurisé',
      desc: 'Authentification JWT avec sessions protégées.'
    }
  ];
}