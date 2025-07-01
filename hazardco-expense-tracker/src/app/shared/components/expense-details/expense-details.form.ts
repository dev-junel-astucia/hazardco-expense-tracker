import { inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ExpenseRequest } from '../../model/expense-details.model';

export type ExpenseDetailsForm = ReturnType<typeof injectExpenseDetailsForm>;

export function injectExpenseDetailsForm() {
  const fb = inject(NonNullableFormBuilder);

  const initialValues: ExpenseRequest = {
    title: '',
    amount: 0,
    category: '',
    date: '',
  };

  const controlField = <K extends keyof ExpenseRequest>(
    fieldName: K,
    validators?: ValidatorFn | ValidatorFn[]
  ) => fb.control<ExpenseRequest[K]>(initialValues[fieldName], validators);

  const { required } = Validators;

  return fb.group(
    {
      title: controlField('title', [required]),
      amount: controlField('amount', [required]),
      category: controlField('category', [required]),
      date: controlField('date', [required]),
    },
    { updateOn: 'change' }
  );
}
