import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../../../shared/models/cart/cart.model';
import { Product } from '../../../shared/models/products/products.model';
import { ShippingMethod } from '../../../shared/models/shipping/shipping.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  private readonly _shipping = signal<ShippingMethod | null>(null);

  readonly items = this._items.asReadonly();
  readonly shipping = this._shipping.asReadonly();

  readonly itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly total = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  addItem(product: Product): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeItem(productId: string): void {
    this._items.update((items) => items.filter((i) => i.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this._items.update((items) =>
      items.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }

  clear(): void {
    this._items.set([]);
  }

  setShipping(method: ShippingMethod): void {
    this._shipping.set(method);
  }
}
