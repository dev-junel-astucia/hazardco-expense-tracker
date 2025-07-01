import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ExpenseDetailsForm,
  injectExpenseDetailsForm,
} from './expense-details.form';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CreateExpense, selectExpenseRequest } from '../../../state/expense';

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

  constructor() {
    effect(() => {
      if (this.request()) {
        this.resetForm();
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

  resetForm(): void {
    this.form.reset({
      title: '',
      amount: 0,
      category: '',
      date: '',
    });
  }
}
