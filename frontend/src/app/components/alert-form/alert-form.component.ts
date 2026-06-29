import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-alert-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.scss']
})
export class AlertFormComponent {
  symbols = ['AAPL', 'EURUSD', 'BTC', 'TSLA'];

  selectedSymbol = this.symbols[0];
  threshold: number | null = null;
  direction: 'above' | 'below' = 'above';

  confirmation = '';

  constructor(private priceService: PriceService) {}

  submit(): void {
    if (this.threshold === null || this.threshold <= 0) {
      this.confirmation = 'Merci de saisir un seuil valide.';
      return;
    }

    this.priceService.setAlert(
      this.selectedSymbol,
      this.threshold,
      this.direction === 'above'
    );

    this.confirmation = `Alerte créée : ${this.selectedSymbol} ${this.direction === 'above' ? '>' : '<'} ${this.threshold}`;
    this.threshold = null;
  }
}