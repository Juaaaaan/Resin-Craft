import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LINKS_NAVBAR } from '../../../consts/nav/navbar.const';
import { NavbarComponent } from './navbar';

@Component({ template: '' })
class StubComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([{ path: '**', component: StubComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose LINKS_NAVBAR as links', () => {
    expect(component.links).toEqual(LINKS_NAVBAR);
  });

  it('should initialize menuOpen to false', () => {
    expect(component.menuOpen()).toBe(false);
  });

  it('toggleMenu() should open the menu when it is closed', () => {
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);
  });

  it('toggleMenu() should close the menu when it is open', () => {
    component.toggleMenu();
    component.toggleMenu();
    expect(component.menuOpen()).toBe(false);
  });

  it('closeMenu() should set menuOpen to false', () => {
    component.toggleMenu();
    component.closeMenu();
    expect(component.menuOpen()).toBe(false);
  });

  it('should render a link for each nav item', () => {
    const el: HTMLElement = fixture.nativeElement;
    const hrefs = Array.from(el.querySelectorAll<HTMLAnchorElement>('nav a')).map((a) =>
      a.getAttribute('href'),
    );
    LINKS_NAVBAR.forEach((link) => expect(hrefs).toContain(link.route));
  });

  it('should render each nav link only once when the mobile menu is closed', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstLinkEls = el.querySelectorAll<HTMLAnchorElement>(
      `a[href="${LINKS_NAVBAR[0].route}"]`,
    );
    expect(firstLinkEls.length).toBe(1);
  });

  it('should render nav links twice when the mobile menu is open', async () => {
    component.toggleMenu();
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const firstLinkEls = el.querySelectorAll<HTMLAnchorElement>(
      `a[href="${LINKS_NAVBAR[0].route}"]`,
    );
    expect(firstLinkEls.length).toBe(2);
  });

  it('clicking the hamburger button should open the mobile menu', async () => {
    const el: HTMLElement = fixture.nativeElement;
    const hamburger = el.querySelector<HTMLButtonElement>('button[aria-label="Abrir menú"]');
    hamburger!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.menuOpen()).toBe(true);
  });

  it('clicking the logo should close the mobile menu', async () => {
    component.toggleMenu();
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const logo = el.querySelector<HTMLAnchorElement>('a[href="/"]');
    logo!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.menuOpen()).toBe(false);
  });

  it('clicking a mobile menu link should close the mobile menu', async () => {
    component.toggleMenu();
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    // second occurrence of the link is the mobile one
    const mobileLink = el.querySelectorAll<HTMLAnchorElement>(
      `a[href="${LINKS_NAVBAR[0].route}"]`,
    )[1];
    mobileLink.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.menuOpen()).toBe(false);
  });
});
