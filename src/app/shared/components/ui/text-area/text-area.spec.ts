import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextArea } from './text-area';

describe('TextArea', () => {
  let component: TextArea;
  let fixture: ComponentFixture<TextArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextArea],
    }).compileComponents();

    fixture = TestBed.createComponent(TextArea);
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

    it('should default placeholder to ""', () => {
      expect(component.placeholder()).toBe('');
    });

    it('should default value to ""', () => {
      expect(component.value()).toBe('');
    });

    it('should default error to ""', () => {
      expect(component.error()).toBe('');
    });

    it('should default hint to ""', () => {
      expect(component.hint()).toBe('');
    });

    it('should default rows to 4', () => {
      expect(component.rows()).toBe(4);
    });

    it('should default disabled to false', () => {
      expect(component.disabled()).toBeFalse();
    });

    it('should default required to false', () => {
      expect(component.required()).toBeFalse();
    });

    it('should default maxLength to null', () => {
      expect(component.maxLength()).toBeNull();
    });
  });

  describe('inputClasses', () => {
    it('should always include base classes', () => {
      const classes = component.inputClasses();
      expect(classes).toContain('w-full');
      expect(classes).toContain('bg-transparent');
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('duration-300');
      expect(classes).toContain('disabled:opacity-40');
      expect(classes).toContain('disabled:pointer-events-none');
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

  describe('currentLength', () => {
    it('should be 0 when value is empty', () => {
      expect(component.currentLength()).toBe(0);
    });

    it('should be 0 when value is null', () => {
      fixture.componentRef.setInput('value', null);
      expect(component.currentLength()).toBe(0);
    });

    it('should reflect the length of the value', () => {
      fixture.componentRef.setInput('value', 'hello');
      expect(component.currentLength()).toBe(5);
    });

    it('should update when value changes', () => {
      fixture.componentRef.setInput('value', 'abc');
      expect(component.currentLength()).toBe(3);
      fixture.componentRef.setInput('value', 'abcdef');
      expect(component.currentLength()).toBe(6);
    });
  });

  describe('template — label', () => {
    it('should not render label when label input is empty', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('label')).toBeNull();
    });

    it('should render label when label input is set', () => {
      fixture.componentRef.setInput('label', 'Description');
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
      expect(label).not.toBeNull();
      expect(label.textContent).toContain('Description');
    });

    it('should associate label with textarea via for/id', () => {
      fixture.componentRef.setInput('id', 'description-field');
      fixture.componentRef.setInput('label', 'Description');
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
      expect(label.getAttribute('for')).toBe('description-field');
    });

    it('should show required asterisk when label and required are set', () => {
      fixture.componentRef.setInput('label', 'Description');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      const asterisk = fixture.nativeElement.querySelector('label span');
      expect(asterisk).not.toBeNull();
      expect(asterisk.textContent.trim()).toBe('*');
      expect(asterisk.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not show required asterisk when required is false', () => {
      fixture.componentRef.setInput('label', 'Description');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('label span')).toBeNull();
    });
  });

  describe('template — textarea element', () => {
    it('should bind value attribute', () => {
      fixture.componentRef.setInput('value', 'Initial content');
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.value).toBe('Initial content');
    });

    it('should bind placeholder attribute', () => {
      fixture.componentRef.setInput('placeholder', 'Write your message');
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.placeholder).toBe('Write your message');
    });

    it('should bind rows attribute', () => {
      fixture.componentRef.setInput('rows', 8);
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.rows).toBe(8);
    });

    it('should default rows to 4 in the DOM', () => {
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.rows).toBe(4);
    });

    it('should bind disabled attribute', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.disabled).toBeTrue();
    });

    it('should bind required attribute', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.required).toBeTrue();
    });

    it('should bind maxlength attribute when set', () => {
      fixture.componentRef.setInput('maxLength', 200);
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.getAttribute('maxlength')).toBe('200');
    });

    it('should not set maxlength attribute when null', () => {
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.getAttribute('maxlength')).toBeNull();
    });

    it('should apply computed inputClasses', () => {
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      expect(textareaEl.className).toContain('w-full');
      expect(textareaEl.className).toContain('border-outline-variant');
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
      fixture.componentRef.setInput('hint', 'Up to 500 characters');
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.querySelector('[role="alert"]')).toBeNull();
      expect(nativeEl.textContent).toContain('Up to 500 characters');
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
    });
  });

  describe('template — character counter', () => {
    it('should not render counter when maxLength is null', () => {
      fixture.componentRef.setInput('value', 'hello');
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.textContent).not.toContain('/');
    });

    it('should render counter when maxLength is set', () => {
      fixture.componentRef.setInput('value', 'hello');
      fixture.componentRef.setInput('maxLength', 100);
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.textContent).toContain('5 / 100');
    });

    it('should show 0 / maxLength when value is empty', () => {
      fixture.componentRef.setInput('maxLength', 100);
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.textContent).toContain('0 / 100');
    });

    it('should update counter when value changes', () => {
      fixture.componentRef.setInput('value', 'hi');
      fixture.componentRef.setInput('maxLength', 50);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('2 / 50');

      fixture.componentRef.setInput('value', 'hello world');
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('11 / 50');
    });
  });

  describe('onInput', () => {
    it('should emit valueChange with the current textarea value', () => {
      const spy = jasmine.createSpy('valueChange');
      component.valueChange.subscribe(spy);
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      textareaEl.value = 'Some long description';
      textareaEl.dispatchEvent(new Event('input'));
      expect(spy).toHaveBeenCalledWith('Some long description');
    });

    it('should emit empty string when textarea is cleared', () => {
      const spy = jasmine.createSpy('valueChange');
      component.valueChange.subscribe(spy);
      fixture.detectChanges();
      const textareaEl: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
      textareaEl.value = '';
      textareaEl.dispatchEvent(new Event('input'));
      expect(spy).toHaveBeenCalledWith('');
    });
  });
});
