import { ShippingService } from './shipping.service';
import { ShippingMethod } from '../../../shared/models/shipping/shipping.model';

describe('ShippingService', () => {
  let service: ShippingService;

  beforeEach(() => {
    service = new ShippingService();
  });

  it('should return zero for pickup regardless of subtotal', () => {
    expect(service.calculateCost('pickup', 10)).toBe(0);
    expect(service.calculateCost('pickup', 100)).toBe(0);
  });

  it('should return zero when subtotal reaches the free-shipping threshold', () => {
    expect(service.calculateCost('ordinary', 80)).toBe(0);
    expect(service.calculateCost('certified', 80)).toBe(0);
  });

  it('should return the option price for ordinary shipping below the threshold', () => {
    expect(service.calculateCost('ordinary', 79)).toBe(4.5);
  });

  it('should return the option price for certified shipping below the threshold', () => {
    expect(service.calculateCost('certified', 79)).toBe(7.5);
  });

  it('should return zero for an unknown shipping method', () => {
    const method = 'unknown' as ShippingMethod;

    expect(service.calculateCost(method, 10)).toBe(0);
  });
});
