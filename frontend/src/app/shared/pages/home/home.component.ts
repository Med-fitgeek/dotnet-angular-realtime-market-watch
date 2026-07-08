import { Component, OnInit, OnDestroy } from '@angular/core';
import { PriceDashboardComponent } from '../../../features/business/price-dashboard/price-dashboard.component';
import { AlertFormComponent } from '../../../features/business/alert-form/alert-form.component';
import { AlertFeedComponent } from '../../../features/business/alert-feed/alert-feed.component';
import { PriceService } from '../../../core/services/price.service';
import { AuthService } from '../../../features/auth/services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PriceDashboardComponent, AlertFormComponent, AlertFeedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  username = this.auth.username;

  constructor(private price: PriceService, private auth: AuthService) {}

  ngOnInit() {
    const token = this.auth.getToken();
    if (token) this.price.startConnection(token);
  }

  ngOnDestroy() {
    this.price.stopConnection();
  }
}