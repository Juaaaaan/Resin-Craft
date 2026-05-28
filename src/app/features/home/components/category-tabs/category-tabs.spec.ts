import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTabs } from './category-tabs';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CategoryTabs', () => {
  let component: CategoryTabs;
  let fixture: ComponentFixture<CategoryTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTabs],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set active tab on setActive function', () => {
    component.setActive('colgantes');
    expect(component.activeTab()).toBe('colgantes');
  });
});
