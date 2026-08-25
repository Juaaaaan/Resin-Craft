import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { ProductCard } from './product-card';
import { Product } from '../../models/products/products.model';
import { StockStatus } from '../../consts/products/products.const';

registerLocaleData(localeEs);

const mockProduct: Product = {
  id: '1',
  name: 'Ocean Waves Tray',
  slug: 'ocean-waves-tray',
  description: 'A beautiful tray',
  price: 45.5,
  is_customizable: true,
  category: { name: 'Trays', slug: 'trays' },
  collection: { name: 'Ethereal Series', slug: 'ethereal-series' },
  images: [{ url: 'https://example.com/img.jpg', is_primary: true, sort_order: 0 }],
};

function createFixture(
  platform: string,
  product: Product = mockProduct,
): { fixture: ComponentFixture<ProductCard>; component: ProductCard } {
  TestBed.configureTestingModule({
    imports: [ProductCard],
    providers: [
      { provide: PLATFORM_ID, useValue: platform },
      { provide: LOCALE_ID, useValue: 'es-ES' },
    ],
  });
  const fixture = TestBed.createComponent(ProductCard);
  const component = fixture.componentInstance;
  fixture.componentRef.setInput('product', product);
  return { fixture, component };
}

describe('ProductCard', () => {
  afterEach(() => TestBed.resetTestingModule());

  describe('browser platform', () => {
    let fixture: ComponentFixture<ProductCard>;
    let component: ProductCard;
    let el: HTMLElement;

    beforeEach(async () => {
      ({ fixture, component } = createFixture('browser'));
      await fixture.whenStable();
      el = fixture.nativeElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render image in browser when product has images', () => {
      const img = el.querySelector('img');
      expect(img).toBeTruthy();
    });

    it('should display product name', () => {
      const heading = el.querySelector('h4');
      expect(heading?.textContent?.trim()).toBe('Ocean Waves Tray');
    });

    it('should display collection name when product has collection', () => {
      const collectionEl = el.querySelector('span.text-label-sm');
      expect(collectionEl?.textContent?.trim()).toBe('Ethereal Series');
    });

    it('should not display collection when product has no collection', async () => {
      const noCollectionProduct = { ...mockProduct, collection: null };
      fixture.componentRef.setInput('product', noCollectionProduct);
      await fixture.whenStable();
      const labels = el.querySelectorAll('span.text-label-sm');
      const collectionLabels = Array.from(labels).filter(
        (l) => !l.closest('.aspect-4\\/5') && l.textContent?.trim() !== '',
      );
      expect(
        collectionLabels.some((l) => l.textContent?.trim() === 'Ethereal Series'),
      ).toBeFalse();
    });

    it('should display price in EUR format', () => {
      const priceEl = el.querySelector('.font-body-md');
      expect(priceEl?.textContent?.trim()).toContain('45,50');
      expect(priceEl?.textContent?.trim()).toContain('€');
    });

    it('should emit product when add to bag is clicked', () => {
      const spy = spyOn(component.addToBag, 'emit');
      const evMock = new MouseEvent('click');
      component.onAddToBag(evMock);
      expect(spy).toHaveBeenCalledWith(mockProduct);
    });

    it('should show NEW badge when isNew is true', async () => {
      fixture.componentRef.setInput('isNew', true);
      await fixture.whenStable();
      const badge = el.querySelector('app-badge');
      expect(badge?.textContent?.trim()).toBe('NEW');
    });

    it('should not show NEW badge when isNew is false', () => {
      const badges = el.querySelectorAll('app-badge');
      const newBadge = Array.from(badges).find((b) => b.textContent?.trim() === 'NEW');
      expect(newBadge).toBeFalsy();
    });

    it('should show placeholder when product has no images', async () => {
      const noImageProduct = { ...mockProduct, images: [] };
      fixture.componentRef.setInput('product', noImageProduct);
      await fixture.whenStable();
      const img = el.querySelector('img');
      expect(img).toBeFalsy();
      const placeholder = el.querySelector('.bg-surface-container-high');
      expect(placeholder).toBeTruthy();
    });

    describe('availability badge', () => {
      it('should show "Disponible" badge for available status', async () => {
        fixture.componentRef.setInput('stockStatus', 'available' as StockStatus);
        await fixture.whenStable();
        const badges = el.querySelectorAll('app-badge');
        const stockBadge = Array.from(badges).find(
          (b) => b.textContent?.trim() === 'Disponible',
        );
        expect(stockBadge).toBeTruthy();
      });

      it('should show "Reservado" badge for reserved status', async () => {
        fixture.componentRef.setInput('stockStatus', 'reserved' as StockStatus);
        await fixture.whenStable();
        const badges = el.querySelectorAll('app-badge');
        const stockBadge = Array.from(badges).find(
          (b) => b.textContent?.trim() === 'Reservado',
        );
        expect(stockBadge).toBeTruthy();
      });

      it('should show "Vendido" badge for sold status', async () => {
        fixture.componentRef.setInput('stockStatus', 'sold' as StockStatus);
        await fixture.whenStable();
        const badges = el.querySelectorAll('app-badge');
        const stockBadge = Array.from(badges).find((b) => b.textContent?.trim() === 'Vendido');
        expect(stockBadge).toBeTruthy();
      });

      it('should not show availability badge when stockStatus is null', () => {
        const badges = el.querySelectorAll('app-badge');
        const stockBadge = Array.from(badges).find((b) =>
          ['Disponible', 'Reservado', 'Vendido'].includes(b.textContent?.trim() ?? ''),
        );
        expect(stockBadge).toBeFalsy();
      });
    });
  });

  describe('server platform', () => {
    it('should not render image on server', async () => {
      const { fixture } = createFixture('server');
      await fixture.whenStable();
      const img = fixture.nativeElement.querySelector('img');
      expect(img).toBeFalsy();
    });

    it('should show placeholder on server', async () => {
      const { fixture } = createFixture('server');
      await fixture.whenStable();
      const placeholder = fixture.nativeElement.querySelector('.bg-surface-container-high');
      expect(placeholder).toBeTruthy();
    });
  });
});
