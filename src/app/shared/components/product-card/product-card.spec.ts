import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';
import { Product } from '../../models/products/products.model';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

const mockProduct: Product = {
  id: '',
  name: '',
  slug: '',
  description: '',
  price: 0,
  is_customizable: true,
  category: {
    name: '',
    slug: '',
  },
  collection: {
    name: '',
    slug: '',
  },
  images: [],
};

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit product when add to bag', () => {
    const spy = spyOn(component.addToBag, 'emit');
    const evMock: MouseEvent = new MouseEvent('click');
    component.onAddToBag(evMock);
    expect(spy).toHaveBeenCalled();
  });
});
