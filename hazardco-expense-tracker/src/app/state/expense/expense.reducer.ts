import { createReducer, on } from '@ngrx/store';
import {
  ExpenseApiError,
  ExpenseApiSuccess,
  CreateExpense,
  DeleteExpenseById,
  GetAllExpenseById,
  ResetExpenseState,
  UpdateExpenseById,
  SelectExpenseItem,
} from './expense.action';

export const initialExpenseState = {};

export const expenseReducer = createReducer(
  initialExpenseState,
  on(GetAllExpenseById, (state, selectedId): any => ({
    ...state,
    selectedId,
  })),
  on(CreateExpense, (state, request): any => ({
    ...state,
    request,
  })),
  on(SelectExpenseItem, (state, selectedItem): any => ({
    ...state,
    selectedItem,
  })),
  on(UpdateExpenseById, (state, request): any => ({
    ...state,
    request,
  })),
  on(DeleteExpenseById, (state, selectedId): any => ({
    ...state,
    selectedId,
  })),
  on(ExpenseApiSuccess, (state, success): any => ({
    ...state,
    ...success,
  })),
  on(ExpenseApiError, (state, error): any => ({
    ...state,
    error,
  })),
  on(ResetExpenseState, (): any => ({
    ...initialExpenseState,
  }))
);
