import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Badge } from './badge';

describe('Badge', () => {
  let component: Badge;
  let fixture: ComponentFixture<Badge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badge],
    }).compileComponents();

    fixture = TestBed.createComponent(Badge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.textContent.trim()).toBe('');
  });

  it('should apply default variant classes by default', () => {
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.className).toContain('bg-surface-container');
  });

  it('should apply primary variant classes', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.className).toContain('bg-primary-container');
  });

  it('should apply secondary variant classes', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.className).toContain('bg-secondary-container');
  });

  it('should apply outline variant classes', () => {
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.className).toContain('border-outline-variant');
  });

  it('should apply sm size classes', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.className).toContain('text-[10px]');
  });
});
