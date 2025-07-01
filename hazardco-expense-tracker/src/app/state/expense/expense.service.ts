import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ExpenseRequest } from '../../shared/model/expense-details.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(private http: HttpClient) {}
  public getExpenses(): Observable<any> {
    return this.http
      .get<any>(`${environment.HC_API_URL}/expenses`, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }
  public createExpense(expenseRequest: ExpenseRequest): Observable<any> {
    return this.http
      .post<any>(`${environment.HC_API_URL}/expenses`, expenseRequest, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }
}
