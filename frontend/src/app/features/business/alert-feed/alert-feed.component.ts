import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AlertTriggered, PriceService } from '../../../core/services/price.service';

interface AlertWithMeta extends AlertTriggered {
  id: number;
  receivedAt: Date;
}

@Component({
  selector: 'app-alert-feed',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './alert-feed.component.html',
  styleUrl: './alert-feed.component.scss'
})
export class AlertFeedComponent {
  alerts = signal<AlertWithMeta[]>([]);
  private counter = 0;

  constructor(private priceService: PriceService) {
    this.priceService.alerts$.subscribe(list => {
      // Ajoute uniquement les nouvelles alertes avec metadata
      const existing = this.alerts().map(a => a.id);
      const incoming = list
        .filter((_, i) => !existing.includes(i))
        .map(a => ({ ...a, id: this.counter++, receivedAt: new Date() }));

      if (incoming.length) {
        this.alerts.update(prev => [...incoming, ...prev].slice(0, 20));
      }
    });
  }

  dismiss(id: number) {
    this.alerts.update(list => list.filter(a => a.id !== id));
  }

  clearAll() {
    this.alerts.set([]);
  }
}