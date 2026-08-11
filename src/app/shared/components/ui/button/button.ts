import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonSize, ButtonVariant } from '../../../consts/components/button/button.const';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');

  clicked = output<void>();

  protected readonly variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-on-surface text-surface hover:opacity-90',
    secondary: 'border border-outline text-on-surface hover:bg-surface-container',
    ghost: 'text-on-surface-variant hover:text-on-surface',
  };

  protected readonly sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-sm py-xs text-label-sm',
    md: 'px-lg py-sm',
    lg: 'px-xl py-md',
  };

  readonly classes = computed(() => {
    const base =
      'inline-flex items-center cursor-pointer justify-center gap-xs rounded font-sans font-semibold tracking-label uppercase transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none';
    const width = this.fullWidth() ? 'w-full' : '';
    return `${base} ${this.variantClasses[this.variant()]} ${this.sizeClasses[this.size()]} ${width}`;
  });

  onClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }
}
