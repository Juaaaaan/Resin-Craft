import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandStory } from './brand-story';

describe('BrandStory', () => {
  let component: BrandStory;
  let fixture: ComponentFixture<BrandStory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandStory],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandStory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
