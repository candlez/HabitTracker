import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()), provideCharts(withDefaultRegisterables())
  ]
};
