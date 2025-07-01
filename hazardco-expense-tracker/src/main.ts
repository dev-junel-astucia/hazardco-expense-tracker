import { APP_BASE_HREF } from '@angular/common';
import { APP_ID, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

function bootstrap() {
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(appRoutes),
      importProvidersFrom(BrowserModule),
      { provide: APP_ID, useValue: 'serverApp' },
      { provide: APP_BASE_HREF, useValue: '/expense-tracker' },
    ],
  }).catch((err) => console.error(err));
}

if (document.readyState !== 'loading') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
