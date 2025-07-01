import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ExpenseDetailsForm,
  injectExpenseDetailsForm,
} from './expense-details.form';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  CreateExpense,
  selectedExpenseItem,
  selectExpenseRequest,
  UpdateExpenseById,
} from '../../../state/expense';
import { ExpenseDetails } from '../../model/expense-details.model';

@Component({
  selector: 'hc-expense-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-details.component.html',
  styleUrl: './expense-details.component.scss',
  standalone: true,
})
export class ExpenseDetailsComponent {
  #store = inject(Store);
  readonly form = injectExpenseDetailsForm();
  categories: string[] = ['Food', 'Transport', 'Utilities', 'Entertainment'];

  request = this.#store.selectSignal(selectExpenseRequest);
  selectedExpenseItem = this.#store.selectSignal(selectedExpenseItem);
  selectedItem: string | null = null;

  constructor() {
    effect(() => {
      if (this.request()) {
        this.resetForm();
      }

      const expense: ExpenseDetails = this.selectedExpenseItem();
      if (expense) {
        this.selectedItem = expense.id;
        this.setForm(expense);
      } else {
        this.selectedItem = null;
      }
    });
  }

  createNewExpense() {
    if (this.form.valid) {
      this.#store.dispatch(
        CreateExpense({
          title: this.form.get('title')!.value,
          category: this.form.get('category')!.value,
          amount: this.form.get('amount')!.value,
          date: new Date(this.form.get('date')!.value).toISOString(),
        })
      );
    }
  }

  updateExpenseById(selectedId: string) {
    if (this.form.valid) {
      this.#store.dispatch(
        UpdateExpenseById({
          id: selectedId,
          title: this.form.get('title')!.value,
          category: this.form.get('category')!.value,
          amount: this.form.get('amount')!.value,
          date: new Date(this.form.get('date')!.value).toISOString(),
        })
      );
    }
  }

  resetForm(): void {
    this.form.reset({
      title: '',
      amount: 0,
      category: '',
      date: '',
    });
  }

  setForm(expense: ExpenseDetails): void {
    this.form.reset({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: this.formatDateForInput(expense.date),
    });
  }

  formatDateForInput(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
