import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  PLATFORM_ID,
} from '@angular/core';
import { MODAL_SIZES, ModalSize } from '../../../consts/components/modal/modal.const';
import { isPlatformBrowser } from '@angular/common';

import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-modal',
  imports: [A11yModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  private platformId = inject(PLATFORM_ID);

  isOpen = input<boolean>(false);
  size = input<ModalSize>('md');
  title = input<string>('');
  closeable = input<boolean>(true);

  closed = output<void>();

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
    });
  }

  close(): void {
    if (this.closeable()) {
      this.closed.emit();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  get panelClasses(): string {
    const base =
      'relative bg-surface w-full mx-margin-safe flex flex-col shadow-soft rounded-lg max-h-[90vh]';

    return `${base} ${MODAL_SIZES[this.size()]}`;
  }
}
