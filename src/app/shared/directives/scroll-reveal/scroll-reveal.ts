import {
  Directive,
  DestroyRef,
  ElementRef,
  Renderer2,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

export type ScrollRevealDirection = 'up' | 'left' | 'right';

const TRANSFORM_MAP: Record<ScrollRevealDirection, string> = {
  up: 'translateY(20px)',
  left: 'translateX(20px)',
  right: 'translateX(-20px)',
};

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective {
  readonly direction = input<ScrollRevealDirection>('up');
  readonly delay = input(0);
  readonly threshold = input(0.1);

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      if (this.prefersReducedMotion()) {
        return;
      }

      this.applyInitialStyles();
      this.setupObserver();
    });
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private applyInitialStyles(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'opacity', '0');
    this.renderer.setStyle(el, 'transform', TRANSFORM_MAP[this.direction()]);
    this.renderer.setStyle(
      el,
      'transition',
      `opacity 700ms ease, transform 700ms ease`
    );
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal(entry.target);
            this.observer!.unobserve(entry.target);
          }
        }
      },
      { threshold: this.threshold() }
    );

    this.observer.observe(this.el.nativeElement);

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
    });
  }

  private reveal(target: Element): void {
    const delayMs = this.delay();
    if (delayMs > 0) {
      this.renderer.setStyle(target, 'transition-delay', `${delayMs}ms`);
    }
    this.renderer.setStyle(target, 'opacity', '1');
    this.renderer.setStyle(target, 'transform', 'none');
  }
}
