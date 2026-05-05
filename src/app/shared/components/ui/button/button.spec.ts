import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should default variant to "primary"', () => {
      expect(component.variant()).toBe('primary');
    });

    it('should default size to "md"', () => {
      expect(component.size()).toBe('md');
    });

    it('should default disabled to false', () => {
      expect(component.disabled()).toBeFalse();
    });

    it('should default loading to false', () => {
      expect(component.loading()).toBeFalse();
    });

    it('should default type to "button"', () => {
      expect(component.type()).toBe('button');
    });
  });

  describe('classes getter', () => {
    it('should always include base classes', () => {
      const classes = component.classes;
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('transition-all');
      expect(classes).toContain('duration-300');
      expect(classes).toContain('disabled:opacity-40');
    });

    it('should include primary variant classes by default', () => {
      expect(component.classes).toContain('bg-[#4A4541]');
      expect(component.classes).toContain('text-white');
    });

    it('should include secondary variant classes when set', () => {
      fixture.componentRef.setInput('variant', 'secondary');
      const classes = component.classes;
      expect(classes).toContain('border-outline');
      expect(classes).toContain('text-on-surface');
    });

    it('should include ghost variant classes when set', () => {
      fixture.componentRef.setInput('variant', 'ghost');
      expect(component.classes).toContain('text-on-surface-variant');
    });

    it('should include md size classes by default', () => {
      const classes = component.classes;
      expect(classes).toContain('px-lg');
      expect(classes).toContain('py-sm');
    });

    it('should include sm size classes when set', () => {
      fixture.componentRef.setInput('size', 'sm');
      const classes = component.classes;
      expect(classes).toContain('px-sm');
      expect(classes).toContain('py-xs');
    });

    it('should include lg size classes when set', () => {
      fixture.componentRef.setInput('size', 'lg');
      const classes = component.classes;
      expect(classes).toContain('px-xl');
      expect(classes).toContain('py-md');
    });
  });

  describe('onClick', () => {
    it('should emit clicked when not disabled and not loading', () => {
      const spy = jasmine.createSpy('clicked');
      component.clicked.subscribe(spy);
      component.onClick();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not emit clicked when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      const spy = jasmine.createSpy('clicked');
      component.clicked.subscribe(spy);
      component.onClick();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit clicked when loading is true', () => {
      fixture.componentRef.setInput('loading', true);
      const spy = jasmine.createSpy('clicked');
      component.clicked.subscribe(spy);
      component.onClick();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
