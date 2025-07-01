import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ExpenseDetailsForm,
  injectExpenseDetailsForm,
} from './expense-details.form';
import { CommonModule } from '@angular/common';

type ControlName = keyof ExpenseDetailsForm['controls'];

@Component({
  selector: 'hc-expense-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-details.component.html',
  styleUrl: './expense-details.component.scss',
})
export class ExpenseDetailsComponent {
  readonly form = injectExpenseDetailsForm();

  createNewExpense() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form is invalid');
    }

    // const username = this.usernameForm.get('username').value;
    // const formattedUsername = this.formatUsername(username);
    // const usernameType = this.isEmail ? 'eMail' : 'SMS';
    // const usernamePayload: NotificationChangeUsernameRequest = {
    //     transactionId: this.generateTransactionId(),
    //     sourceIdentifier: 'mtnid',
    //     'input-type': usernameType,
    //     'input-data': formattedUsername,
    // };

    // this.store.dispatch(PostNotificationChangeUsername(usernamePayload));
  }
}
