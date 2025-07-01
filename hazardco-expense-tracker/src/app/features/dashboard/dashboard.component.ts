import { Component, effect, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Store } from '@ngrx/store';
import { GetAllExpenses, selectExpenses } from '../../state/expense';
import { ExpenseDetails } from '../../shared/model/expense-details.model';
import { ChartData } from 'chart.js';

@Component({
  selector: 'hc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [SharedModule],
  standalone: true,
})
export class DashboardComponent {
  #store = inject(Store);
  expenses = this.#store.selectSignal(selectExpenses);

  chartType: 'bar' = 'bar';
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor() {
    this.#store.dispatch(GetAllExpenses());

    effect(() => {
      const expenses: ExpenseDetails[] = this.expenses();

      const dates: string[] = [
        ...new Set(expenses.map((e: ExpenseDetails) => e.date)),
      ].sort();
      const categories: string[] = [
        ...new Set(expenses.map((e: ExpenseDetails) => e.category)),
      ];

      const formattedDates: string[] = dates.map((dateStr) => {
        const d = new Date(dateStr);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
      });

      const datasets = categories.map((category) => {
        const data = dates.map((date) => {
          const total = expenses
            .filter(
              (e: ExpenseDetails) => e.category === category && e.date === date
            )
            .reduce((sum: number, e: ExpenseDetails) => sum + e.amount, 0);
          return total;
        });

        return { label: category, data };
      });

      this.chartData = {
        labels: formattedDates,
        datasets: datasets,
      };
    });
  }
}
