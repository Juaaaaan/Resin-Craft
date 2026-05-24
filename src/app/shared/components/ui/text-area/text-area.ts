import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-text-area',
  imports: [],
  templateUrl: './text-area.html',
  styleUrl: './text-area.scss',
})
export class TextArea {
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  value = input<string>('');
  error = input<string>('');
  hint = input<string>('');
  rows = input<number>(4);
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  maxLength = input<number | null>(null);

  valueChange = output<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
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

  readonly currentLength = computed(() => {
    return this.value()?.length ?? 0;
  });
}
