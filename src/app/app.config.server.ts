import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { provideTranslocoLoader } from '@jsverse/transloco';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslocoSsrLoader } from './core/services/transloco/transloco-ssr-loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideNoopAnimations(),
    provideServerRendering(withRoutes(serverRoutes)),
    provideTranslocoLoader(TranslocoSsrLoader),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
