import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { TRANSLOCO_CONST_CONFIG } from '../../consts/translations/transloco.const';
import { CartDrawerComponent } from './cart-drawer';
import { CartService } from '../../../core/services/cart/cart.service';
import { Product } from '../../models/products/products.model';

const mockProduct: Product = {
  id: 'p1',
  name: 'Ethereal Ring',
  slug: 'ethereal-ring',
  description: 'A resin ring',
  price: 25,
  is_customizable: false,
  category: null,
  collection: null,
  images: [],
};

const mockProduct2: Product = {
  id: 'p2',
  name: 'Ocean Pendant',
  slug: 'ocean-pendant',
  description: 'A blue pendant',
  price: 40,
  is_customizable: false,
  category: null,
  collection: null,
  images: [],
};

describe('CartDrawerComponent', () => {
  let component: CartDrawerComponent;
  let fixture: ComponentFixture<CartDrawerComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDrawerComponent, TranslocoTestingModule.forRoot(TRANSLOCO_CONST_CONFIG)],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDrawerComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    await fixture.whenStable();
  });

  afterEach(() => {
    cartService.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('drawer open/close', () => {
    it('should not render drawer when isOpen is false', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.z-50')).toBeNull();
    });

    it('should render drawer when isOpen is true', async () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      await fixture.whenStable();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.z-50')).toBeTruthy();
    });

    it('should close when close button is clicked', async () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      await fixture.whenStable();
      const el: HTMLElement = fixture.nativeElement;
      const closeBtn = el.querySelector<HTMLButtonElement>('.z-50 button');
      closeBtn!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.isOpen()).toBe(false);
    });

    it('should close when backdrop is clicked', async () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      await fixture.whenStable();
      const el: HTMLElement = fixture.nativeElement;
      const backdrop = el.querySelector<HTMLDivElement>('.z-40');
      backdrop!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('cart items display', () => {
    it('should render items with correct name, price, and quantity', async () => {
      cartService.addItem(mockProduct);
      cartService.addItem(mockProduct);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      await fixture.whenStable();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent).toContain('Ethereal Ring');
      expect(el.textContent).toContain('2');
    });

    it('should show empty message when cart is empty', async () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      await fixture.whenStable();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent).toContain('Your cart is empty.');
    });

    it('should hide checkout button when cart is empty', async () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      await fixture.whenStable();
      const el: HTMLElement = fixture.nativeElement;
      const buttons = Array.from(el.querySelectorAll('button'));
      const checkoutBtn = buttons.find((b) => b.textContent?.includes('Proceed to Checkout'));
      expect(checkoutBtn).toBeUndefined();
    });
  });

  describe('quantity controls', () => {
    beforeEach(async () => {
      cartService.addItem(mockProduct);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should call updateQuantity with +1 when increment clicked', () => {
      spyOn(cartService, 'updateQuantity');
      const el: HTMLElement = fixture.nativeElement;
      const buttons = Array.from(el.querySelectorAll<HTMLButtonElement>('.z-50 button'));
      const incrementBtn = buttons.find((b) => b.textContent?.trim() === '+');
      incrementBtn!.click();
      expect(cartService.updateQuantity).toHaveBeenCalledWith('p1', 2);
    });

    it('should call removeItem when decrementing quantity of 1', () => {
      spyOn(cartService, 'removeItem');
      const el: HTMLElement = fixture.nativeElement;
      const buttons = Array.from(el.querySelectorAll<HTMLButtonElement>('.z-50 button'));
      const decrementBtn = buttons.find((b) => b.textContent?.trim() === '−');
      decrementBtn!.click();
      expect(cartService.removeItem).toHaveBeenCalledWith('p1');
    });

    it('should call updateQuantity with -1 when decrementing quantity > 1', async () => {
      cartService.addItem(mockProduct);
      fixture.detectChanges();
      await fixture.whenStable();
      spyOn(cartService, 'updateQuantity');
      const el: HTMLElement = fixture.nativeElement;
      const buttons = Array.from(el.querySelectorAll<HTMLButtonElement>('.z-50 button'));
      const decrementBtn = buttons.find((b) => b.textContent?.trim() === '−');
      decrementBtn!.click();
      expect(cartService.updateQuantity).toHaveBeenCalledWith('p1', 1);
    });

    it('should call removeItem when remove button clicked', () => {
      spyOn(cartService, 'removeItem');
      const el: HTMLElement = fixture.nativeElement;
      const buttons = Array.from(el.querySelectorAll<HTMLButtonElement>('.z-50 button'));
      const removeBtn = buttons.find((b) => b.textContent?.includes('Remove'));
      removeBtn!.click();
      expect(cartService.removeItem).toHaveBeenCalledWith('p1');
    });
  });

  describe('totals', () => {
    it('should compute subtotal correctly', () => {
      cartService.addItem(mockProduct);
      cartService.addItem(mockProduct2);
      expect(cartService.total()).toBe(65);
    });

    it('should compute grand total with shipping', () => {
      cartService.addItem(mockProduct);
      cartService.setShipping('ordinary');
      expect(component.shippingCost()).toBe(4.5);
      expect(component.grandTotal()).toBe(29.5);
    });

    it('should show null shipping cost when no method selected', () => {
      cartService.addItem(mockProduct);
      expect(component.shippingCost()).toBeNull();
      expect(component.grandTotal()).toBe(25);
    });
  });

  describe('checkout', () => {
    it('should emit checkout output when checkout button clicked', async () => {
      cartService.addItem(mockProduct);
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      await fixture.whenStable();
      spyOn(component.checkout, 'emit');
      const el: HTMLElement = fixture.nativeElement;
      const buttons = Array.from(el.querySelectorAll<HTMLButtonElement>('button'));
      const checkoutBtn = buttons.find((b) => b.textContent?.includes('Proceed to Checkout'));
      checkoutBtn!.click();
      expect(component.checkout.emit).toHaveBeenCalled();
    });
  });
});
