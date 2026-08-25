import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Stock } from './stock';
import { ProductsService } from '../../core/services/products/products.service';
import { StockItem } from '../../shared/models/products/products.model';

registerLocaleData(localeEs);

const mockStockItems: StockItem[] = [
  {
    id: 'si-1',
    status: 'available',
    product: {
      id: '1',
      name: 'Ocean Waves Tray',
      slug: 'ocean-waves-tray',
      description: 'A beautiful tray',
      price: 45.5,
      is_customizable: true,
      category: { name: 'Trays', slug: 'trays' },
      collection: { name: 'Ethereal Series', slug: 'ethereal-series' },
      images: [{ url: 'https://example.com/img.jpg', is_primary: true, sort_order: 0 }],
    },
  },
  {
    id: 'si-2',
    status: 'available',
    product: {
      id: '2',
      name: 'Amber Coaster Set',
      slug: 'amber-coaster-set',
      description: 'Warm amber coasters',
      price: 28.0,
      is_customizable: false,
      category: { name: 'Coasters', slug: 'coasters' },
      collection: null,
      images: [{ url: 'https://example.com/img2.jpg', is_primary: true, sort_order: 0 }],
    },
  },
];

describe('Stock', () => {
  let component: Stock;
  let fixture: ComponentFixture<Stock>;
  let el: HTMLElement;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  async function createComponent(items: StockItem[] = mockStockItems): Promise<void> {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAvailableStock',
      'getPrimaryImage',
    ]);
    productsServiceSpy.getAvailableStock.and.returnValue(Promise.resolve(items));
    productsServiceSpy.getPrimaryImage.and.returnValue('https://example.com/img.jpg');

    await TestBed.configureTestingModule({
      imports: [Stock],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: LOCALE_ID, useValue: 'es-ES' },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Stock);
    component = fixture.componentInstance;
    await fixture.whenStable();
    el = fixture.nativeElement;
  }

  afterEach(() => TestBed.resetTestingModule());

  it('should create', async () => {
    await createComponent();
    expect(component).toBeTruthy();
  });

  it('should call getAvailableStock on init', async () => {
    await createComponent();
    expect(productsServiceSpy.getAvailableStock).toHaveBeenCalled();
  });

  it('should render product cards when items exist', async () => {
    await createComponent();
    const cards = el.querySelectorAll('app-product-card');
    expect(cards.length).toBe(2);
  });

  it('should display empty state when no items', async () => {
    await createComponent([]);
    const emptyMsg = el.querySelector('.text-body-lg');
    expect(emptyMsg?.textContent).toContain('No hay piezas disponibles');
  });

  it('should not show empty state when items exist', async () => {
    await createComponent();
    const text = el.textContent ?? '';
    expect(text).not.toContain('No hay piezas disponibles');
  });

  it('should render commission CTA section', async () => {
    await createComponent();
    const cta = el.querySelector('a[href="/contacto"]');
    expect(cta).toBeTruthy();
    expect(cta?.textContent?.trim()).toBe('SOLICITAR ENCARGO');
  });

  it('should render CTA even with empty inventory', async () => {
    await createComponent([]);
    const cta = el.querySelector('a[href="/contacto"]');
    expect(cta).toBeTruthy();
  });

  it('should set isLoading to false after data loads', async () => {
    await createComponent();
    expect(component.isLoading()).toBeFalse();
  });
});
