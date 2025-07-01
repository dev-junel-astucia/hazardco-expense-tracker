import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DeleteExpenseById, SelectExpenseItem } from '../../../state/expense';
import { ExpenseDetails } from '../../model/expense-details.model';

@Component({
  selector: 'hc-expense-detail-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-detail-list.component.html',
  styleUrl: './expense-detail-list.component.scss',
  standalone: true,
})
export class ExpenseDetailListComponent implements OnChanges {
  #store = inject(Store);

  @Input() expenses: ExpenseDetails[] = [];

  formattedExpenses: Array<ExpenseDetails & { formattedDate: string }> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.formattedExpenses = this.expenses.map((e) => ({
        ...e,
        formattedDate: this.formatDateShort(e.date),
      }));
    }
  }

  private formatDateShort(dateStr: string): string {
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  selectExpense(event: Event, expense: ExpenseDetails) {
    event.preventDefault();
    this.#store.dispatch(SelectExpenseItem(expense));
  }

  deleteExpense(expenseId: string) {
    this.#store.dispatch(DeleteExpenseById({ id: expenseId }));
  }
}
