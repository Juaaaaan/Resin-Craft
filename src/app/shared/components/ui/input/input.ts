import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { InputType } from '../../../consts/components/input/input.const';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  type = input<InputType>('text');
  value = input<string>('');
  error = input<string>('');
  hint = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);

  valueChange = output<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  readonly inputClasses = computed(() => {
    const base =
      'w-full bg-transparent border-0 border-b py-sm font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none';
    const border = this.error()
      ? 'border-error focus:border-error'
      : 'border-outline-variant focus:border-primary';
    return `${base} ${border}`;
  });
}
