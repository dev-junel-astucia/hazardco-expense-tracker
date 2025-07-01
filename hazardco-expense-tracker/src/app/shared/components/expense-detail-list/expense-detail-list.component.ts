import { Component, effect, inject, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CreateExpense, selectExpenseRequest } from '../../../state/expense';
import { ExpenseDetails } from '../../model/expense-details.model';

@Component({
  selector: 'hc-expense-detail-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-detail-list.component.html',
  styleUrl: './expense-detail-list.component.scss',
  standalone: true,
})
export class ExpenseDetailListComponent {
  @Input() expenses: ExpenseDetails[] = [];

  constructor() {
    // effect(() => {
    //   if (this.request()) {
    //     this.resetForm();
    //   }
    // });
    console.log('here', this.expenses);
  }

  // createNewExpense() {
  //   if (this.form.valid) {
  //     this.#store.dispatch(
  //       CreateExpense({
  //         title: this.form.get('title')!.value,
  //         category: this.form.get('category')!.value,
  //         amount: this.form.get('amount')!.value,
  //         date: new Date(this.form.get('date')!.value).toISOString(),
  //       })
  //     );
  //   }
  // }

  // resetForm(): void {
  //   this.form.reset({
  //     title: '',
  //     amount: 0,
  //     category: '',
  //     date: '',
  //   });
  // }
}
