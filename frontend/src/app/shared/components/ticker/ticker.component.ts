import { Component } from '@angular/core';

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
}

@Component({
  selector: 'app-ticker',
  standalone: true,
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.scss'
})
export class TickerComponent {
  readonly items: TickerItem[] = [
    { symbol: 'BTC',     name: 'Bitcoin',       price: '43 250.00', change: '+2.4%',  up: true  },
    { symbol: 'AAPL',    name: 'Apple Inc.',     price: '189.34',    change: '−0.8%',  up: false },
    { symbol: 'EUR/USD', name: 'Euro / Dollar',  price: '1.0842',    change: '+0.3%',  up: true  },
    { symbol: 'GOLD',    name: 'Gold',           price: '2 018.00',  change: '+1.1%',  up: true  },
    { symbol: 'TSLA',    name: 'Tesla Inc.',     price: '196.50',    change: '+1.2%',  up: true  },
    { symbol: 'MSFT',    name: 'Microsoft',      price: '378.92',    change: '−0.4%',  up: false },
    { symbol: 'NVDA',    name: 'Nvidia',         price: '824.15',    change: '+3.1%',  up: true  },
    { symbol: 'S&P500',  name: 'S&P 500 Index',  price: '5 218.40',  change: '+0.6%',  up: true  },
  ];

  // Doublé pour l'animation loop infinie
  get doubled() { return [...this.items, ...this.items]; }
}