import { Component } from '@angular/core';

interface Feature {
  title: string;
  desc: string;
  icon: string; // SVG path d=
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss'
})
export class FeaturesSectionComponent {
  readonly features: Feature[] = [
    {
      title: 'Real-time prices',
      desc:  'Prices update every second via SignalR WebSocket — no polling, no delay.',
      icon:  'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
    },
    {
      title: 'Smart alerts',
      desc:  'Set a price threshold and get notified the instant it is crossed.',
      icon:  'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0'
    },
    {
      title: 'Multi-asset',
      desc:  'Track equities, crypto, forex and commodities in a single dashboard.',
      icon:  'M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18'
    },
    {
      title: 'Secured with JWT',
      desc:  'Token-based authentication with expiry check and silent renewal.',
      icon:  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
    },
    {
      title: 'Price history',
      desc:  'Sparkline charts keep the last 50 ticks per asset, always visible.',
      icon:  'M22 12h-4l-3 9L9 3l-3 9H2'
    },
    {
      title: 'Open source stack',
      desc:  '.NET 8 backend, Angular 18 frontend, PostgreSQL — fully auditable.',
      icon:  'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'
    }
  ];
}