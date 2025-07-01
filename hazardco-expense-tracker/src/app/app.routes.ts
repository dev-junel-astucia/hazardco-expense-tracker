import { Routes } from '@angular/router';

export enum RoutePath {
  Dashboard = 'dashboard',
  Chart = 'chart',

  // Fallouts
  TimeOut = 'time-out',
  GenericIssue = 'generic-issue',
  TechnicalIssue = 'technical-issue',
}

export const appRoutes: Routes = [
  {
    path: RoutePath.Dashboard,
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  { path: '', redirectTo: RoutePath.Dashboard, pathMatch: 'full' },
  { path: '**', redirectTo: RoutePath.Dashboard },
];
