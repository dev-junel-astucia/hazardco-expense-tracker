import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ExpenseActionTypes } from './expense.enum';
import { ExpenseService } from './expense.service';
import {
  ExpenseApiError,
  ExpenseApiSuccess,
  GetAllExpenses,
  ResetExpenseState,
} from './expense.action';
import { selectedExpenseId, selectExpenseRequest } from './expense.selector';
import {
  ExpenseDetails,
  ExpenseRequest,
} from '../../shared/model/expense-details.model';

@Injectable()
export class ExpenseEffect {
  #store = inject(Store);

  constructor(
    private actions$: Actions,
    private expenseService: ExpenseService
  ) {}

  getAllExpensesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExpenseActionTypes.GET_ALL_EXPENSES),
      mergeMap(() => {
        return this.expenseService.getExpenses().pipe(
          map((response: any) => {
            if (response.statusCode !== 200) {
              return ExpenseApiError(response);
            }
            return ExpenseApiSuccess(response);
          }),
          catchError((error) => {
            return of(ExpenseApiError(error));
          })
        );
      })
    );
  });

  createExpenseEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExpenseActionTypes.CREATE_EXPENSE),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.#store.select(selectExpenseRequest))
        )
      ),
      mergeMap(([, expenseRequest]: [any, ExpenseRequest]) => {
        const request: ExpenseRequest = {
          title: expenseRequest.title,
          category: expenseRequest.category,
          amount: expenseRequest.amount,
          date: expenseRequest.date,
        };
        return this.expenseService.createExpense(request).pipe(
          map((response: any) => {
            if (response.statusCode !== 201) {
              return ExpenseApiError(response);
            }
            this.#store.dispatch(ResetExpenseState());
            return GetAllExpenses();
          }),
          catchError((error) => {
            return of(ExpenseApiError(error));
          })
        );
      })
    );
  });

  updateExpenseEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExpenseActionTypes.UPDATE_EXPENSE_BY_ID),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.#store.select(selectExpenseRequest))
        )
      ),
      mergeMap(([, expenseRequest]: [any, ExpenseDetails]) => {
        const request: ExpenseDetails = {
          id: expenseRequest.id,
          title: expenseRequest.title,
          category: expenseRequest.category,
          amount: expenseRequest.amount,
          date: expenseRequest.date,
        };
        return this.expenseService.updateExpense(request).pipe(
          map((response: any) => {
            if (response.statusCode !== 200) {
              return ExpenseApiError(response);
            }
            this.#store.dispatch(ResetExpenseState());
            return GetAllExpenses();
          }),
          catchError((error) => {
            return of(ExpenseApiError(error));
          })
        );
      })
    );
  });

  deleteExpenseEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExpenseActionTypes.DELETE_EXPENSE_BY_ID),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.#store.select(selectedExpenseId)))
      ),
      mergeMap(([, selectedId]: [any, string]) => {
        return this.expenseService.deleteExpenseById(selectedId).pipe(
          map(() => {
            this.#store.dispatch(ResetExpenseState());
            return GetAllExpenses();
          }),
          catchError((error) => {
            return of(ExpenseApiError(error));
          })
        );
      })
    );
  });
}
