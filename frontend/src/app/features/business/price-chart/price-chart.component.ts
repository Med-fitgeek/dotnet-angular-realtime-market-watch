import {
  Component, Input, OnChanges, OnDestroy,
  SimpleChanges, ElementRef, ViewChild, AfterViewInit
} from '@angular/core';
import { PricePoint } from '../../../core/services/price.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-price-chart',
  standalone: true,
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss'
})
export class PriceChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() points: PricePoint[] = [];
  @Input() variation: number = 0;

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  ngAfterViewInit() {
    this.buildChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['points'] && this.chart) {
      this.updateChart();
    }
    if (changes['variation'] && this.chart) {
      this.updateColor();
      this.chart.update('none');
    }
  }

  private get color(): string {
    if (this.variation > 0) return '#16a34a';
    if (this.variation < 0) return '#dc2626';
    return '#9ca3af';
  }

  private buildChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d')!;
    const labels = this.points.map(p => p.timestamp);
    const data   = this.points.map(p => p.price);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: this.color,
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.4,
          fill: true,
          backgroundColor: this.buildGradient(ctx),
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        elements: { line: { borderCapStyle: 'round' } }
      }
    });
  }

  private buildGradient(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 64);
    const c = this.variation >= 0 ? '22, 163, 74' : '220, 38, 38';
    gradient.addColorStop(0, `rgba(${c}, 0.18)`);
    gradient.addColorStop(1, `rgba(${c}, 0.0)`);
    return gradient;
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.labels   = this.points.map(p => p.timestamp);
    this.chart.data.datasets[0].data = this.points.map(p => p.price);
    this.updateColor();
    this.chart.update('none'); // 'none' = pas d'animation pour le temps réel
  }

  private updateColor() {
    if (!this.chart) return;
    const ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.chart.data.datasets[0].borderColor     = this.color;
    this.chart.data.datasets[0].backgroundColor = this.buildGradient(ctx);
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}