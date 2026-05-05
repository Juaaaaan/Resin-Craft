import { Component, input, output } from '@angular/core';
import { ButtonSize, ButtonVariant } from '../../../consts/components/button/button.const';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('md');
  public disabled = input<boolean>(false);
  public loading = input<boolean>(false);
  public type = input<'button' | 'submit' | 'reset'>('button');

  public clicked = output<void>();

  protected readonly variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#4A4541] text-white hover:opacity-90',
    secondary: 'border border-outline text-on-surface hover:bg-surface-container',
    ghost: 'text-on-surface-variant hover:text-on-surface',
  };

  protected readonly sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-sm py-xs text-[11px]',
    md: 'px-lg py-sm',
    lg: 'px-xl py-md',
  };

  public get classes(): string {
    const base =
      'inline-flex items-center justify-center gap-xs font-label-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none';
    return `${base} ${this.variantClasses[this.variant()]} ${this.sizeClasses[this.size()]}`;
  }

  public onClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }
}
