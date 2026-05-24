import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should default id to ""', () => {
      expect(component.id()).toBe('');
    });

    it('should default label to ""', () => {
      expect(component.label()).toBe('');
    });

    it('should default type to "text"', () => {
      expect(component.type()).toBe('text');
    });

    it('should default value to ""', () => {
      expect(component.value()).toBe('');
    });

    it('should default disabled to false', () => {
      expect(component.disabled()).toBeFalse();
    });

    it('should default required to false', () => {
      expect(component.required()).toBeFalse();
    });

    it('should default error to ""', () => {
      expect(component.error()).toBe('');
    });

    it('should default hint to ""', () => {
      expect(component.hint()).toBe('');
    });
  });

  describe('inputClasses', () => {
    it('should always include base classes', () => {
      const classes = component.inputClasses();
      expect(classes).toContain('w-full');
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('duration-300');
      expect(classes).toContain('disabled:opacity-40');
    });

    it('should use default border classes when no error', () => {
      const classes = component.inputClasses();
      expect(classes).toContain('border-outline-variant');
      expect(classes).toContain('focus:border-primary');
    });

    it('should use error border classes when error is set', () => {
      fixture.componentRef.setInput('error', 'Required field');
      const classes = component.inputClasses();
      expect(classes).toContain('border-error');
      expect(classes).toContain('focus:border-error');
      expect(classes).not.toContain('border-outline-variant');
    });
  });

  describe('template — label', () => {
    it('should not render label when label input is empty', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('label')).toBeNull();
    });

    it('should render label when label input is set', () => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
      expect(label).not.toBeNull();
      expect(label.textContent).toContain('Email');
    });

    it('should associate label with input via for/id', () => {
      fixture.componentRef.setInput('id', 'email-field');
      fixture.componentRef.setInput('label', 'Email');
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
      expect(label.getAttribute('for')).toBe('email-field');
    });

    it('should show required asterisk when label and required are set', () => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      const asterisk = fixture.nativeElement.querySelector('label span');
      expect(asterisk).not.toBeNull();
      expect(asterisk.textContent.trim()).toBe('*');
    });

    it('should not show required asterisk when required is false', () => {
      fixture.componentRef.setInput('label', 'Email');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('label span')).toBeNull();
    });
  });

  describe('template — input element', () => {
    it('should bind type attribute', () => {
      fixture.componentRef.setInput('type', 'email');
      fixture.detectChanges();
      const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
      expect(inputEl.type).toBe('email');
    });

    it('should bind placeholder attribute', () => {
      fixture.componentRef.setInput('placeholder', 'Enter your email');
      fixture.detectChanges();
      const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
      expect(inputEl.placeholder).toBe('Enter your email');
    });

    it('should bind disabled attribute', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('input').disabled).toBeTrue();
    });

    it('should bind required attribute', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('input').required).toBeTrue();
    });
  });

  describe('template — error and hint', () => {
    it('should render error message with role="alert" when error is set', () => {
      fixture.componentRef.setInput('error', 'This field is required');
      fixture.detectChanges();
      const errorEl: HTMLElement = fixture.nativeElement.querySelector('[role="alert"]');
      expect(errorEl).not.toBeNull();
      expect(errorEl.textContent?.trim()).toBe('This field is required');
    });

    it('should render hint when hint is set and no error', () => {
      fixture.componentRef.setInput('hint', 'Use a valid email address');
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.querySelector('[role="alert"]')).toBeNull();
      expect(nativeEl.textContent).toContain('Use a valid email address');
    });

    it('should show error and hide hint when both are set', () => {
      fixture.componentRef.setInput('error', 'Invalid value');
      fixture.componentRef.setInput('hint', 'Some helpful hint');
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.querySelector('[role="alert"]')).not.toBeNull();
      expect(nativeEl.textContent).not.toContain('Some helpful hint');
    });

    it('should show neither error nor hint when both are empty', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
      expect(fixture.nativeElement.querySelectorAll('span').length).toBe(0);
    });
  });

  describe('onInput', () => {
    it('should emit valueChange with the current input value', () => {
      const spy = jasmine.createSpy('valueChange');
      component.valueChange.subscribe(spy);
      fixture.detectChanges();
      const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
      inputEl.value = 'hello@example.com';
      inputEl.dispatchEvent(new Event('input'));
      expect(spy).toHaveBeenCalledWith('hello@example.com');
    });
  });
});
