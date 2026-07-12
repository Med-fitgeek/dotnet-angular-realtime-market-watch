import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PriceDashboardComponent } from '../../../features/business/price-dashboard/price-dashboard.component';
import { AlertFormComponent } from '../../../features/business/alert-form/alert-form.component';
import { AlertFeedComponent } from '../../../features/business/alert-feed/alert-feed.component';
import { PriceService } from '../../../core/services/price.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PriceDashboardComponent, AlertFormComponent, AlertFeedComponent, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  username    = this.auth.username;
  alertCount  = signal(0);
  assetCount  = signal(0);
  topGainer   = signal<{ symbol: string; variation: number } | null>(null);
  topLoser    = signal<{ symbol: string; variation: number } | null>(null);
  isConnected = signal(false);

  private sub?: Subscription;

  constructor(private price: PriceService, private auth: AuthService) {}

  ngOnInit() {
    const token = this.auth.getToken();
    if (token) {
      this.price.startConnection(token);
      this.isConnected.set(true);
    }

    // Met à jour les KPIs à chaque tick de prix
    this.sub = combineLatest([
      this.price.prices$,
      this.price.alerts$
    ]).subscribe(([prices, alerts]) => {
      const rows = Array.from(prices.values());

      this.assetCount.set(rows.length);
      this.alertCount.set(alerts.length);

      if (rows.length) {
        const sorted = [...rows].sort((a, b) => b.variation - a.variation);
        this.topGainer.set({ symbol: sorted[0].symbol, variation: sorted[0].variation });
        this.topLoser.set({ symbol: sorted[sorted.length - 1].symbol, variation: sorted[sorted.length - 1].variation });
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.price.stopConnection();
    this.isConnected.set(false);
  }
}