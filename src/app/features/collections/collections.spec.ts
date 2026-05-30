import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collections } from './collections';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import { TRANSLOCO_CONST_CONFIG } from '../../shared/consts/translations/transloco.const';

const translocoOptions: TranslocoTestingOptions = TRANSLOCO_CONST_CONFIG;

describe('Collections', () => {
  let component: Collections;
  let fixture: ComponentFixture<Collections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslocoTestingModule.forRoot(translocoOptions), Collections],
    }).compileComponents();

    fixture = TestBed.createComponent(Collections);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
