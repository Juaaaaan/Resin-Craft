import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProducts } from './featured-products';
import { Product } from '../../../../shared/models/products/products.model';

const mockProducts: Product[] = [
  {
    id: 'mock',
    name: 'mock',
    slug: 'mock',
    description: 'mock',
    price: 0,
    is_customizable: false,
    category: null,
    collection: null,
    images: [],
  },
];

describe('FeaturedProducts', () => {
  let component: FeaturedProducts;
  let fixture: ComponentFixture<FeaturedProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', async () => {
    spyOn(component['productService'], 'getFeaturedProducts').and.resolveTo(mockProducts);

    await component.ngOnInit();

    expect(component.products()).toEqual(mockProducts);
    expect(component.loading()).toBeFalse();
    expect(component.error()).toBeNull();
  });

  it('should add to bag on onAddToBag', () => {
    spyOn(component.addToBag, 'emit');

    const product = mockProducts[0];
    component.onAddToBag(product);

    expect(component.addToBag.emit).toHaveBeenCalledWith(product);
  });
});
