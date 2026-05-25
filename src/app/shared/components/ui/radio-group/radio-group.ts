import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RadioOption } from '../../../models/ui/radio-group.model';
import { RadioGroupOrientation } from '../../../consts/components/radio-group/radio-group.const';

@Component({
  selector: 'app-radio-group',
  imports: [],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroup {
  label = input<string>('');
  options = input<RadioOption[]>([]);
  value = input<string>('');
  error = input<string>('');
  hint = input<string>('');
  orientation = input<RadioGroupOrientation>('vertical');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  name = input<string>(`radio-group-${Math.random().toString(36).slice(2)}`);

  valueChange = output<string>();

  onChange(value: string): void {
    this.valueChange.emit(value);
  }

  get groupClasses(): string {
    return this.orientation() === 'horizontal' ? 'flex flex-wrap gap-md' : 'flex flex-col gap-sm';
  }

  isSelected(optionValue: string): boolean {
    return this.value() === optionValue;
  }

  isDisabled(option: RadioOption): boolean {
    return this.disabled() || (option.disabled ?? false);
  }
}
