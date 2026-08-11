export type ShippingMethod = 'ordinary' | 'certified' | 'pickup';

export interface ShippingOption {
  method: ShippingMethod;
  label: string;
  price: number;
  estimatedDays: string;
}
