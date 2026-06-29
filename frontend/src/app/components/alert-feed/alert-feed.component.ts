import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceService, AlertTriggered } from '../../services/price.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-feed.component.html',
  styleUrls: ['./alert-feed.component.scss']
})
export class AlertFeedComponent implements OnInit, OnDestroy {
  alerts: AlertTriggered[] = [];
  private sub?: Subscription;

  constructor(private priceService: PriceService) {}

  ngOnInit(): void {
    this.sub = this.priceService.alerts$.subscribe(list => {
      this.alerts = list;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}