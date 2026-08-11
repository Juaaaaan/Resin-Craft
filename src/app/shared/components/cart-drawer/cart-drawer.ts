import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  model,
  output,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CurrencyPipe } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { CartService } from '../../../core/services/cart/cart.service';
import { ShippingService } from '../../../core/services/shipping/shipping.service';
import { ShippingMethod } from '../../models/shipping/shipping.model';
import { slideDrawer } from '../../animations/slide-drawer.animation';

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyPipe, TranslocoPipe],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideDrawer],
})
export class CartDrawerComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly cartService = inject(CartService);
  readonly shippingService = inject(ShippingService);

  readonly isOpen = model(false);
  readonly checkout = output<void>();

  readonly shippingCost = computed(() => {
    const method = this.cartService.shipping();
    if (!method) return null;
    return this.shippingService.calculateCost(method, this.cartService.total());
  });

  readonly grandTotal = computed(() => {
    const shipping = this.shippingCost();
    return this.cartService.total() + (shipping ?? 0);
  });

  private readonly scrollLock = isPlatformBrowser(this.platformId)
    ? effect(() => {
        document.body.style.overflow = this.isOpen() ? 'hidden' : '';
      })
    : null;

  close(): void {
    this.isOpen.set(false);
  }

  increment(productId: string, currentQty: number): void {
    this.cartService.updateQuantity(productId, currentQty + 1);
  }

  decrement(productId: string, currentQty: number): void {
    if (currentQty <= 1) {
      this.cartService.removeItem(productId);
    } else {
      this.cartService.updateQuantity(productId, currentQty - 1);
    }
  }

  remove(productId: string): void {
    this.cartService.removeItem(productId);
  }

  selectShipping(method: ShippingMethod): void {
    this.cartService.setShipping(method);
  }
}
