import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PriceService } from '../../../core/services/price.service';

@Component({
  selector: 'app-alert-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alert-form.component.html',
  styleUrl: './alert-form.component.scss'
})
export class AlertFormComponent {
  readonly symbols = ['AAPL', 'EURUSD', 'BTC', 'TSLA'];

  form: FormGroup;
  confirmation = signal<string | null>(null);

  constructor(private fb: FormBuilder, private priceService: PriceService) {
    this.form = this.fb.group({
      symbol:    [this.symbols[0], Validators.required],
      direction: ['above', Validators.required],
      threshold: [null, [Validators.required, Validators.min(0.0001)]]
    });
  }

  get threshold() { return this.form.get('threshold')!; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const { symbol, direction, threshold } = this.form.value;
    this.priceService.setAlert(symbol, threshold, direction === 'above');

    this.confirmation.set(
      `✅ Alerte créée : ${symbol} ${direction === 'above' ? '>' : '<'} ${threshold}`
    );
    this.form.patchValue({ threshold: null });

    setTimeout(() => this.confirmation.set(null), 4000);
  }
}