import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Select } from './select';
import { SelectOption } from '../../../models/ui/select.model';

describe('Select', () => {
  let component: Select;
  let fixture: ComponentFixture<Select>;

  const options: SelectOption[] = [
    { value: 'gold', label: 'Gold Plated' },
    { value: 'silver', label: 'Silver Plated' },
    { value: 'bronze', label: 'Bronze', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select],
    }).compileComponents();

    fixture = TestBed.createComponent(Select);
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

    it('should default placeholder to "Selecciona una opción"', () => {
      expect(component.placeholder()).toBe('Selecciona una opción');
    });

    it('should default options to []', () => {
      expect(component.options()).toEqual([]);
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

    it('should default disabled to false', () => {
      expect(component.disabled()).toBeFalse();
    });

    it('should default required to false', () => {
      expect(component.required()).toBeFalse();
    });
  });

  describe('selectClasses', () => {
    it('should always include base classes', () => {
      const classes = component.selectClasses;
      expect(classes).toContain('w-full');
      expect(classes).toContain('bg-transparent');
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('duration-300');
      expect(classes).toContain('appearance-none');
      expect(classes).toContain('disabled:opacity-40');
    });

    it('should use default border classes when no error', () => {
      const classes = component.selectClasses;
      expect(classes).toContain('border-outline-variant');
      expect(classes).toContain('focus:border-primary');
    });

    it('should use error border classes when error is set', () => {
      fixture.componentRef.setInput('error', 'Required field');
      const classes = component.selectClasses;
      expect(classes).toContain('border-error');
      expect(classes).toContain('focus:border-error');
      expect(classes).not.toContain('border-outline-variant');
    });

    it('should use muted text color when value is empty', () => {
      const classes = component.selectClasses;
      expect(classes).toContain('text-on-surface-variant/50');
    });

    it('should use on-surface text color when value is set', () => {
      fixture.componentRef.setInput('value', 'gold');
      const classes = component.selectClasses;
      expect(classes).toContain('text-on-surface');
      expect(classes).not.toContain('text-on-surface-variant/50');
    });
  });

  describe('template — label', () => {
    it('should not render label when label input is empty', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('label')).toBeNull();
    });

    it('should render label when label input is set', () => {
      fixture.componentRef.setInput('label', 'Material');
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
      expect(label).not.toBeNull();
      expect(label.textContent).toContain('Material');
    });

    it('should associate label with select via for/id', () => {
      fixture.componentRef.setInput('id', 'material-field');
      fixture.componentRef.setInput('label', 'Material');
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
      expect(label.getAttribute('for')).toBe('material-field');
    });

    it('should show required asterisk when label and required are set', () => {
      fixture.componentRef.setInput('label', 'Material');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      const asterisk = fixture.nativeElement.querySelector('label span');
      expect(asterisk).not.toBeNull();
      expect(asterisk.textContent.trim()).toBe('*');
    });

    it('should not show required asterisk when required is false', () => {
      fixture.componentRef.setInput('label', 'Material');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('label span')).toBeNull();
    });
  });

  describe('template — select element', () => {
    it('should bind disabled attribute', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const selectEl: HTMLSelectElement = fixture.nativeElement.querySelector('select');
      expect(selectEl.disabled).toBeTrue();
    });

    it('should bind required attribute', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      const selectEl: HTMLSelectElement = fixture.nativeElement.querySelector('select');
      expect(selectEl.required).toBeTrue();
    });

    it('should reflect the current value', () => {
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('value', 'silver');
      fixture.detectChanges();
      const selectEl: HTMLSelectElement = fixture.nativeElement.querySelector('select');
      expect(selectEl.value).toBe('silver');
    });
  });

  describe('template — placeholder option', () => {
    it('should render placeholder option when placeholder is set', () => {
      fixture.componentRef.setInput('placeholder', 'Pick a finish');
      fixture.detectChanges();
      const placeholderOption: HTMLOptionElement =
        fixture.nativeElement.querySelector('option[value=""]');
      expect(placeholderOption).not.toBeNull();
      expect(placeholderOption.textContent?.trim()).toBe('Pick a finish');
      expect(placeholderOption.disabled).toBeTrue();
    });

    it('should not render placeholder option when placeholder is empty', () => {
      fixture.componentRef.setInput('placeholder', '');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('option[value=""]')).toBeNull();
    });
  });

  describe('template — options', () => {
    it('should render an option per item in options()', () => {
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      const optionEls: NodeListOf<HTMLOptionElement> =
        fixture.nativeElement.querySelectorAll('option:not([value=""])');
      expect(optionEls.length).toBe(3);
      expect(optionEls[0].value).toBe('gold');
      expect(optionEls[0].textContent?.trim()).toBe('Gold Plated');
    });

    it('should mark option as disabled when option.disabled is true', () => {
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      const bronzeOption: HTMLOptionElement =
        fixture.nativeElement.querySelector('option[value="bronze"]');
      expect(bronzeOption.disabled).toBeTrue();
    });

    it('should not mark option as disabled when option.disabled is undefined', () => {
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      const goldOption: HTMLOptionElement =
        fixture.nativeElement.querySelector('option[value="gold"]');
      expect(goldOption.disabled).toBeFalse();
    });

    it('should render no options when options() is empty', () => {
      fixture.detectChanges();
      const optionEls = fixture.nativeElement.querySelectorAll('option:not([value=""])');
      expect(optionEls.length).toBe(0);
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
      fixture.componentRef.setInput('hint', 'Choose carefully');
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.querySelector('[role="alert"]')).toBeNull();
      expect(nativeEl.textContent).toContain('Choose carefully');
    });

    it('should show error and hide hint when both are set', () => {
      fixture.componentRef.setInput('error', 'Invalid selection');
      fixture.componentRef.setInput('hint', 'Some helpful hint');
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.querySelector('[role="alert"]')).not.toBeNull();
      expect(nativeEl.textContent).not.toContain('Some helpful hint');
    });

    it('should show neither error nor hint when both are empty', () => {
      fixture.detectChanges();
      const nativeEl: HTMLElement = fixture.nativeElement;
      expect(nativeEl.querySelector('[role="alert"]')).toBeNull();
      const messageSpans = nativeEl.querySelectorAll('div > span');
      expect(messageSpans.length).toBe(0);
    });
  });

  describe('onChange', () => {
    it('should emit valueChange with the selected option value', () => {
      const spy = jasmine.createSpy('valueChange');
      component.valueChange.subscribe(spy);
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      const selectEl: HTMLSelectElement = fixture.nativeElement.querySelector('select');
      selectEl.value = 'silver';
      selectEl.dispatchEvent(new Event('change'));
      expect(spy).toHaveBeenCalledWith('silver');
    });
  });
});
