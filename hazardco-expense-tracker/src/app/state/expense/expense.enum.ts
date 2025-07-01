export enum ExpenseActionTypes {
  GET_EXPENSE_BY_ID = '[Expense] get expense by id',
  GET_ALL_EXPENSES = '[Expense] get all expenses',
  CREATE_EXPENSE = '[Expense] create expense',
  SELECT_EXPENSE_ITEM = '[Expense] select expense item',
  UPDATE_EXPENSE_BY_ID = '[Expense] update expense by id',
  DELETE_EXPENSE_BY_ID = '[Expense] delete expense by id',
  EXPENSE_API_SUCCESS = '[Expense] call expense api success',
  EXPENSE_API_ERROR = '[Expense] call expense api error',
  RESET_EXPENSE_STATE = '[Expense] reset expense state',
}
