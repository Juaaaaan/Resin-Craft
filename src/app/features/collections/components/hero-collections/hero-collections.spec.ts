import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import { HeroCollections } from './hero-collections';
import { TRANSLOCO_CONST_CONFIG } from '../../../../shared/consts/translations/transloco.const';

const translocoOptions: TranslocoTestingOptions = TRANSLOCO_CONST_CONFIG;

describe('HeroCollections', () => {
  let component: HeroCollections;
  let fixture: ComponentFixture<HeroCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslocoTestingModule.forRoot(translocoOptions), HeroCollections],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCollections);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
