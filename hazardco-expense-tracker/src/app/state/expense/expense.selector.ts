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

export const selectedExpenseId = createSelector(
  selectExpenseState,
  (state) => state.selectedId.id
);

export const selectedExpenseItem = createSelector(
  selectExpenseState,
  (state) => state.selectedItem
);
