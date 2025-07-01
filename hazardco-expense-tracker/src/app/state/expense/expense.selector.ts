import { createSelector } from '@ngrx/store';

export const selectExpenseState = (state: any) => state.expense;

export const selectExpenses = createSelector(
  selectExpenseState,
  (state) => state.data || []
);

export const selectExpenseRequest = createSelector(
  selectExpenseState,
  (state) => state.request || []
);
