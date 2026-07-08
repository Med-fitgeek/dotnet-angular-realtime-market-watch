import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { PriceService, PriceUpdate } from '../../../core/services/price.service';

interface DisplayRow extends PriceUpdate {
  flash: 'up' | 'down' | null;
}

@Component({
  selector: 'app-price-dashboard',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './price-dashboard.component.html',
  styleUrl: './price-dashboard.component.scss'
})
export class PriceDashboardComponent implements OnInit, OnDestroy {
  rows = signal<DisplayRow[]>([]);

  private sub?: Subscription;
  private flashTimers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor(private priceService: PriceService) {}

  ngOnInit() {
    this.sub = this.priceService.prices$.subscribe(map => {
      this.rows.update(() =>
        Array.from(map.values()).map(update => ({
          ...update,
          flash: update.variation > 0 ? 'up' : update.variation < 0 ? 'down' : null
        }))
      );
      map.forEach((_, symbol) => this.scheduleFlashReset(symbol));
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