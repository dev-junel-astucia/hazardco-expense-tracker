import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ExpenseDetailsComponent } from './components/expense-details/expense-details.component';
import { ChartComponent } from './components/chart/chart.component';
import { ExpenseDetailListComponent } from './components/expense-detail-list/expense-detail-list.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarComponent,
    ExpenseDetailsComponent,
    ExpenseDetailListComponent,
    ChartComponent,
  ],
  exports: [
    NavbarComponent,
    ExpenseDetailsComponent,
    ExpenseDetailListComponent,
    ChartComponent,
  ],
})
export class SharedModule {}
