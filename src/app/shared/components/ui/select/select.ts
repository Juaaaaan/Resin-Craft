import { Component, input, output } from '@angular/core';
import { SelectOption } from '../../../models/ui/select.model';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('Selecciona una opción');
  options = input<SelectOption[]>([]);
  value = input<string>('');
  error = input<string>('');
  hint = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);

  valueChange = output<string>();

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.valueChange.emit(target.value);
  }

  get selectClasses(): string {
    const base =
      'w-full bg-transparent border-0 border-b py-sm font-body-md text-on-surface outline-none transition-colors duration-300 cursor-pointer appearance-none disabled:opacity-40 disabled:pointer-events-none';
    const border = this.error()
      ? 'border-error focus:border-error'
      : 'border-outline-variant focus:border-primary';
    const textColor = this.value() ? 'text-on-surface' : 'text-on-surface-variant/50';
    return `${base} ${border} ${textColor}`;
  }
}
