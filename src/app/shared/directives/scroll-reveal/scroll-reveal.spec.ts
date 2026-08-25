import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollRevealDirective } from './scroll-reveal';

let intersectionCallback: IntersectionObserverCallback;
let observerInstances: MockIntersectionObserver[];

class MockIntersectionObserver {
  observe = jasmine.createSpy('observe');
  unobserve = jasmine.createSpy('unobserve');
  disconnect = jasmine.createSpy('disconnect');
  takeRecords = () => [];
  root = null;
  rootMargin = '';
  thresholds = [];

  constructor(
    callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {
    intersectionCallback = callback;
    observerInstances.push(this);
  }
}

@Component({
  imports: [ScrollRevealDirective],
  template: `<div appScrollReveal direction="up">Content</div>`,
})
class TestHostComponent {}

@Component({
  imports: [ScrollRevealDirective],
  template: `<div appScrollReveal direction="left" [delay]="200">Content</div>`,
})
class TestHostWithDelayComponent {}

function setupMatchMedia(reducedMotion: boolean): void {
  const original = window.matchMedia.bind(window);
  spyOn(window, 'matchMedia').and.callFake((query: string) => {
    if (query === '(prefers-reduced-motion: reduce)') {
      return { matches: reducedMotion } as MediaQueryList;
    }
    return original(query);
  });
}

function createFixture<T>(
  component: new () => T,
  platformId = 'browser'
): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [component],
    providers: [{ provide: PLATFORM_ID, useValue: platformId }],
  });

  return TestBed.createComponent(component);
}

describe('ScrollRevealDirective', () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    observerInstances = [];
    originalIntersectionObserver = window.IntersectionObserver;
    (window as unknown as Record<string, unknown>)['IntersectionObserver'] =
      MockIntersectionObserver;
  });

  afterEach(() => {
    (window as unknown as Record<string, unknown>)['IntersectionObserver'] =
      originalIntersectionObserver;
  });

  it('should apply initial hidden styles in browser environment', async () => {
    setupMatchMedia(false);
    const fixture = createFixture(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('[appScrollReveal]') as HTMLElement;
    expect(el.style.opacity).toBe('0');
    expect(el.style.transform).toBe('translateY(20px)');
    expect(el.style.transition).toContain('700ms');
  });

  it('should reveal element on intersection and unobserve', async () => {
    setupMatchMedia(false);
    const fixture = createFixture(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('[appScrollReveal]') as HTMLElement;
    const observer = observerInstances[0];
    expect(observer.observe).toHaveBeenCalledWith(el);

    intersectionCallback(
      [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(el.style.opacity).toBe('1');
    expect(el.style.transform).toBe('none');
    expect(observer.unobserve).toHaveBeenCalledWith(el);
  });

  it('should respect delay input (transition-delay applied)', async () => {
    setupMatchMedia(false);
    const fixture = createFixture(TestHostWithDelayComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('[appScrollReveal]') as HTMLElement;

    intersectionCallback(
      [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(el.style.transitionDelay).toBe('200ms');
  });

  it('should use afterNextRender for SSR safety (no direct browser API access)', () => {
    const source = ScrollRevealDirective.toString();
    expect(source).toContain('afterNextRender');
    expect(source).not.toMatch(/ngOnInit|ngAfterViewInit/);
  });

  it('should show elements without animation when reduced-motion is active', async () => {
    setupMatchMedia(true);
    const fixture = createFixture(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('[appScrollReveal]') as HTMLElement;
    expect(el.style.opacity).not.toBe('0');
    expect(observerInstances.length).toBe(0);
  });
});
