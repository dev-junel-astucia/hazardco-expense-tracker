import { createReducer, on } from '@ngrx/store';
import {
  ExpenseApiError,
  ExpenseApiSuccess,
  CreateExpense,
  DeleteExpenseById,
  GetAllExpenseById,
  ResetExpenseState,
  UpdateExpenseById,
} from './expense.action';

export const initialExpenseState = {};

export const expenseReducer = createReducer(
  initialExpenseState,
  on(GetAllExpenseById, (state, payload): any => ({
    ...state,
    ...payload,
  })),
  on(CreateExpense, (state, request): any => ({
    ...state,
    request,
  })),
  on(UpdateExpenseById, (state, payload): any => ({
    ...state,
    ...payload,
  })),
  on(DeleteExpenseById, (state, payload): any => ({
    ...state,
    ...payload,
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
