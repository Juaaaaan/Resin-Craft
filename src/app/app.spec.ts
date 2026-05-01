import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import { App } from './app';

import { TRANSLOCO_CONST_CONFIG } from './shared/consts/translations/transloco.const';

const translocoOptions: TranslocoTestingOptions = TRANSLOCO_CONST_CONFIG;

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, TranslocoTestingModule.forRoot(translocoOptions)],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
