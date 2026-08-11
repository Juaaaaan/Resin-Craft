import { Injectable } from '@angular/core';
import { ShippingMethod, ShippingOption } from '../../../shared/models/shipping/shipping.model';

@Injectable({ providedIn: 'root' })
export class ShippingService {
  readonly FREE_SHIPPING_THRESHOLD = 80;

  readonly options: ShippingOption[] = [
    { method: 'ordinary', label: 'shipping.ordinary', price: 4.5, estimatedDays: '5-7' },
    { method: 'certified', label: 'shipping.certified', price: 7.5, estimatedDays: '2-3' },
    { method: 'pickup', label: 'shipping.pickup', price: 0, estimatedDays: '1' },
  ];

  calculateCost(method: ShippingMethod, subtotal: number): number {
    if (method === 'pickup') {
      return 0;
    }
    if (subtotal >= this.FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    const option = this.options.find((o) => o.method === method);
    return option?.price ?? 0;
  }
}
