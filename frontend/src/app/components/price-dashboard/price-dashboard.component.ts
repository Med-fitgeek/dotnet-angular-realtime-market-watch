import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceService, PriceUpdate } from '../../services/price.service';
import { Subscription } from 'rxjs';

interface DisplayRow extends PriceUpdate {
  flash: 'up' | 'down' | null;
}

@Component({
  selector: 'app-price-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-dashboard.component.html',
  styleUrls: ['./price-dashboard.component.scss']
})
export class PriceDashboardComponent implements OnInit, OnDestroy {
  rows: DisplayRow[] = [];
  private sub?: Subscription;
  private flashTimers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor(private priceService: PriceService) {}

  ngOnInit(): void {
    this.sub = this.priceService.prices$.subscribe(map => {
      this.rows = Array.from(map.values()).map(update => {
        const flash = update.variation > 0 ? 'up' : update.variation < 0 ? 'down' : null;
        this.triggerFlashReset(update.symbol);
        return { ...update, flash };
      });
    });
  }

  private triggerFlashReset(symbol: string): void {
    const existing = this.flashTimers.get(symbol);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(() => {
      this.rows = this.rows.map(r =>
        r.symbol === symbol ? { ...r, flash: null } : r
      );
    }, 600);

    this.flashTimers.set(symbol, timer);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.flashTimers.forEach(t => clearTimeout(t));
  }
}