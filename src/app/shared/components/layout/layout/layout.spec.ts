import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { LayoutComponent } from './layout';
import { NavbarComponent } from '../navbar/navbar';
import { CartDrawerComponent } from '../../cart-drawer/cart-drawer';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import { TRANSLOCO_CONST_CONFIG } from '../../../consts/translations/transloco.const';

const translocoOptions: TranslocoTestingOptions = TRANSLOCO_CONST_CONFIG;

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, TranslocoTestingModule.forRoot(translocoOptions)],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-navbar')).toBeTruthy();
  });

  it('should render the footer', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-footer')).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have cart closed initially and child isOpen false', () => {
    expect(component.cartOpen()).toBeFalse();

    const drawerDebug = fixture.debugElement.query(By.directive(CartDrawerComponent));
    expect(drawerDebug).toBeTruthy();
    const drawerCmp = drawerDebug.componentInstance;
    // CartDrawer exposes `isOpen` as a model (signal)
    expect(drawerCmp.isOpen()).toBeFalse();
  });

  it('toggleCart opens and closes the cart and updates child isOpen', () => {
    // open
    component.toggleCart();
    fixture.detectChanges();
    expect(component.cartOpen()).toBeTrue();

    const drawerDebug = fixture.debugElement.query(By.directive(CartDrawerComponent));
    const drawerCmp = drawerDebug.componentInstance;
    expect(drawerCmp.isOpen()).toBeTrue();

    // close
    component.toggleCart();
    fixture.detectChanges();
    expect(component.cartOpen()).toBeFalse();
    expect(drawerCmp.isOpen()).toBeFalse();
  });

  it('navbar cartClick output triggers toggleCart', () => {
    const spy = spyOn(component, 'toggleCart');
    const navDebug = fixture.debugElement.query(By.directive(NavbarComponent));
    const navCmp = navDebug.componentInstance;
    // simulate navbar emitting the cartClick output
    navCmp.cartClick.emit();
    expect(spy).toHaveBeenCalled();
  });

  it('cart-drawer checkout output calls onCheckout and closes the cart', () => {
    // open first
    component.cartOpen.set(true);
    fixture.detectChanges();

    const spy = spyOn(component, 'onCheckout').and.callThrough();

    const drawerDebug = fixture.debugElement.query(By.directive(CartDrawerComponent));
    const drawerCmp = drawerDebug.componentInstance;
    drawerCmp.checkout.emit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.cartOpen()).toBeFalse();
    expect(drawerCmp.isOpen()).toBeFalse();
  });
});
