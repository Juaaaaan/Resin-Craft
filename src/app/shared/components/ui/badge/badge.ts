import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeSize, BadgeVariant } from '../../../consts/components/badge/badge.const';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  variant = input<BadgeVariant>('default');
  size = input<BadgeSize>('md');

  get classes(): string {
    const base =
      'inline-flex items-center font-label-sm uppercase tracking-widest rounded-full transition-colors duration-300';

    const variants: Record<BadgeVariant, string> = {
      default: 'bg-surface-container text-on-surface-variant',
      primary: 'bg-primary-container text-on-primary-container',
      secondary: 'bg-secondary-container text-on-surface-variant',
      outline: 'border border-outline-variant text-on-surface-variant bg-transparent',
    };

    const sizes: Record<BadgeSize, string> = {
      sm: 'px-xs py-[2px] text-[10px]',
      md: 'px-sm py-xs',
    };

    return `${base} ${variants[this.variant()]} ${sizes[this.size()]}`;
  }
}
