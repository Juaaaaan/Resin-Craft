import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCards } from './health-cards';

describe('HealthCards', () => {
  let component: HealthCards;
  let fixture: ComponentFixture<HealthCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthCards],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
