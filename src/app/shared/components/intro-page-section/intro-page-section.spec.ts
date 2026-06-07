import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroPageSection } from './intro-page-section';

describe('IntroPageSection', () => {
  let component: IntroPageSection;
  let fixture: ComponentFixture<IntroPageSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroPageSection],
    }).compileComponents();

    fixture = TestBed.createComponent(IntroPageSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
