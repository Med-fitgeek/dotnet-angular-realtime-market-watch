import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceDashboardComponent } from '../../components/price-dashboard/price-dashboard.component';
import { AlertFormComponent } from '../../components/alert-form/alert-form.component';
import { AlertFeedComponent } from '../../components/alert-feed/alert-feed.component';
import { PriceService } from '../../services/price.service';
import { AuthService } from '../../services/auth.service'; // garde ton service existant

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PriceDashboardComponent, AlertFormComponent, AlertFeedComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private priceService: PriceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken(); // adapte au nom réel de ta méthode existante
    if (token) {
      this.priceService.startConnection(token);
    }
  }
}