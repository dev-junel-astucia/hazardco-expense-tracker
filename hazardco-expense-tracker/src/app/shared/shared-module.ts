import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ExpenseDetailsComponent } from './components/expense-details/expense-details.component';

@NgModule({
  imports: [CommonModule, NavbarComponent, ExpenseDetailsComponent],
  exports: [NavbarComponent, ExpenseDetailsComponent],
})
export class SharedModule {}
