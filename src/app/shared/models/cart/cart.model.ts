import { Product } from '../products/products.model';

export interface CartItem {
  product: Product;
  quantity: number;
}
