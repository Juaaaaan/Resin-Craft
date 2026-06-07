import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCare } from './health-care';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import { TRANSLOCO_CONST_CONFIG } from '../../shared/consts/translations/transloco.const';

const translocoOptions: TranslocoTestingOptions = TRANSLOCO_CONST_CONFIG;

describe('HealthCare', () => {
  let component: HealthCare;
  let fixture: ComponentFixture<HealthCare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthCare, TranslocoTestingModule.forRoot(translocoOptions)],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthCare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
