import { createAction, props } from '@ngrx/store';
import { ExpenseActionTypes } from './expense.enum';
import {
  ExpenseApiErrorPayload,
  ExpenseApiSuccessPayload,
  ExpenseDetails,
  ExpenseRequest,
} from '../../shared/model/expense-details.model';

export const GetAllExpenses = createAction(ExpenseActionTypes.GET_ALL_EXPENSES);
export const GetAllExpenseById = createAction(
  ExpenseActionTypes.GET_EXPENSE_BY_ID,
  props<{ id: string }>()
);
export const CreateExpense = createAction(
  ExpenseActionTypes.CREATE_EXPENSE,
  props<ExpenseRequest>()
);
export const SelectExpenseItem = createAction(
  ExpenseActionTypes.SELECT_EXPENSE_ITEM,
  props<ExpenseDetails>()
);
export const UpdateExpenseById = createAction(
  ExpenseActionTypes.UPDATE_EXPENSE_BY_ID,
  props<ExpenseDetails>()
);
export const DeleteExpenseById = createAction(
  ExpenseActionTypes.DELETE_EXPENSE_BY_ID,
  props<{ id: string }>()
);
export const ExpenseApiSuccess = createAction(
  ExpenseActionTypes.EXPENSE_API_SUCCESS,
  props<ExpenseApiSuccessPayload>()
);
export const ExpenseApiError = createAction(
  ExpenseActionTypes.EXPENSE_API_ERROR,
  props<ExpenseApiErrorPayload>()
);
export const ResetExpenseState = createAction(
  ExpenseActionTypes.RESET_EXPENSE_STATE
);
