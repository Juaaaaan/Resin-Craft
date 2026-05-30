import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCards } from './info-cards';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import { TRANSLOCO_CONST_CONFIG } from '../../../../shared/consts/translations/transloco.const';

const translocoOptions: TranslocoTestingOptions = TRANSLOCO_CONST_CONFIG;

describe('InfoCards', () => {
  let component: InfoCards;
  let fixture: ComponentFixture<InfoCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslocoTestingModule.forRoot(translocoOptions), InfoCards],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
