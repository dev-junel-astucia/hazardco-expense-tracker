import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'hc-chart',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  standalone: true,
})
export class ChartComponent {
  @Input() chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  @Input() chartType: ChartType = 'bar';

  @Input() chartData: ChartData = {
    labels: [],
    datasets: [{ data: [], label: 'Expenses' }],
  };
}
