import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioOption } from '../../../models/ui/radio-group.model';
import { RadioGroup } from './radio-group';

const mockOptions: RadioOption[] = [
  { value: 'uv', label: 'UV Resin' },
  { value: 'epoxy', label: 'Epoxy Resin' },
  { value: 'polyester', label: 'Polyester Resin', disabled: true },
];

const mockOptionsWithDescriptions: RadioOption[] = [
  { value: 'uv', label: 'UV Resin', description: 'Fast curing' },
  { value: 'epoxy', label: 'Epoxy Resin', description: 'Strong finish' },
];

describe('RadioGroup', () => {
  let component: RadioGroup;
  let fixture: ComponentFixture<RadioGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroup);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Tipo de resina');
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('span');
    expect(label.textContent.trim()).toContain('Tipo de resina');
  });

  it('should render all options', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input[type="radio"]');
    expect(inputs.length).toBe(3);
  });

  it('should emit valueChange when option selected', () => {
    const spy = jasmine.createSpy('valueChange');
    component.valueChange.subscribe(spy);
    const inputs = fixture.nativeElement.querySelectorAll('input[type="radio"]');
    inputs[0].dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith('uv');
  });

  it('should mark option as checked when value matches', () => {
    fixture.componentRef.setInput('value', 'epoxy');
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input[type="radio"]');
    expect(inputs[1].checked).toBeTrue();
  });

  it('should disable individual option when option.disabled is true', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input[type="radio"]');
    expect(inputs[2].disabled).toBeTrue();
  });

  it('should disable all options when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input[type="radio"]');
    inputs.forEach((input: HTMLInputElement) => {
      expect(input.disabled).toBeTrue();
    });
  });

  it('should show required indicator when required', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const indicator = fixture.nativeElement.querySelector('[aria-hidden="true"]');
    expect(indicator).toBeTruthy();
  });

  it('should show error message when error is set', () => {
    fixture.componentRef.setInput('error', 'Selecciona un tipo');
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert.textContent.trim()).toBe('Selecciona un tipo');
  });

  it('should render descriptions when provided', () => {
    fixture.componentRef.setInput('options', mockOptionsWithDescriptions);
    fixture.detectChanges();
    const descriptions = fixture.nativeElement.querySelectorAll('.mt-xs');
    expect(descriptions.length).toBe(2);
  });

  it('should apply horizontal layout when orientation is horizontal', () => {
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group.className).toContain('flex-wrap');
  });

  it('should not render label when label is empty', () => {
    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();
    const labelEl = fixture.nativeElement.querySelector('span.font-label-sm');
    expect(labelEl).toBeNull();
  });

  it('should not show required indicator when required is false', () => {
    const indicator = fixture.nativeElement.querySelector('[aria-hidden="true"]');
    expect(indicator).toBeNull();
  });

  it('should apply vertical layout by default', () => {
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(group.className).toContain('flex-col');
  });

  it('should show hint when hint is set and no error', () => {
    fixture.componentRef.setInput('hint', 'Elige el tipo de resina');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Elige el tipo de resina');
  });
});
