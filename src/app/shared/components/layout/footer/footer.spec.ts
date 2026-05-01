import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the current year', () => {
    expect(component.year).toBe(new Date().getFullYear());
  });

  it('should render the copyright text containing the current year', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain(component.year.toString());
  });

  it('should render the logo link pointing to the home route', () => {
    const el: HTMLElement = fixture.nativeElement;
    const logoLink = el.querySelector<HTMLAnchorElement>('a[href="/"]');
    expect(logoLink).toBeTruthy();
    expect(logoLink!.textContent!.trim()).toBe('Resin Craft Art');
  });

  it('should render navigation links to /cuidados, /contacto and /personaliza', () => {
    const el: HTMLElement = fixture.nativeElement;
    const hrefs = Array.from(el.querySelectorAll<HTMLAnchorElement>('a')).map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toContain('/cuidados');
    expect(hrefs).toContain('/contacto');
    expect(hrefs).toContain('/personaliza');
  });
});
