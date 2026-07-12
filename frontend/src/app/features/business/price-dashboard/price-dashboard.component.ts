import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Subscription, combineLatest } from 'rxjs';
import { PriceService, PriceUpdate, PricePoint } from '../../../core/services/price.service';
import { PriceChartComponent } from '../price-chart/price-chart.component';

interface DisplayRow extends PriceUpdate {
  flash:   'up' | 'down' | null;
  history: PricePoint[];
}

@Component({
  selector: 'app-price-dashboard',
  standalone: true,
  imports: [DecimalPipe, DatePipe, PriceChartComponent],
  templateUrl: './price-dashboard.component.html',
  styleUrl: './price-dashboard.component.scss'
})
export class PriceDashboardComponent implements OnInit, OnDestroy {
  rows = signal<DisplayRow[]>([]);

  private sub?: Subscription;
  private flashTimers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor(private priceService: PriceService) {}

  ngOnInit() {
    // combineLatest : on reçoit prix ET historique ensemble à chaque tick
    this.sub = combineLatest([
      this.priceService.prices$,
      this.priceService.history$
    ]).subscribe(([prices, history]) => {
      this.rows.update(() =>
        Array.from(prices.values()).map(update => ({
          ...update,
          flash:   update.variation > 0 ? 'up' : update.variation < 0 ? 'down' : null,
          history: history.get(update.symbol) ?? []
        }))
      );
      prices.forEach((_, symbol) => this.scheduleFlashReset(symbol));
    });
  }

  private scheduleFlashReset(symbol: string) {
    const existing = this.flashTimers.get(symbol);
    if (existing) clearTimeout(existing);
    this.flashTimers.set(symbol, setTimeout(() => {
      this.rows.update(rows =>
        rows.map(r => r.symbol === symbol ? { ...r, flash: null } : r)
      );
    }, 600));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.flashTimers.forEach(t => clearTimeout(t));
  }
}