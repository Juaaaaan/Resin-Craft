import { CartService } from './cart.service';
import { Product } from '../../../shared/models/products/products.model';
import { ShippingMethod } from '../../../shared/models/shipping/shipping.model';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
  });

  function createProduct(id = 'product-1', price = 25): Product {
    return {
      id,
      name: 'Resin pendant',
      slug: 'resin-pendant',
      description: 'Handmade resin pendant',
      price,
      is_customizable: false,
      category: null,
      collection: null,
      images: [],
    };
  }

  it('should add a new product and compute item count and total', () => {
    const product = createProduct();

    service.addItem(product);

    expect(service.items().length).toBe(1);
    expect(service.itemCount()).toBe(1);
    expect(service.total()).toBe(25);
  });

  it('should increase quantity when the same product is added again', () => {
    const firstProduct = createProduct('product-1', 25);
    const secondProduct = createProduct('product-2', 40);

    service.addItem(firstProduct);
    service.addItem(secondProduct);
    service.addItem(firstProduct);

    expect(service.items()).toEqual([
      { product: firstProduct, quantity: 2 },
      { product: secondProduct, quantity: 1 },
    ]);
    expect(service.itemCount()).toBe(3);
    expect(service.total()).toBe(90);
  });

  it('should remove an item from the cart', () => {
    const firstProduct = createProduct('product-1', 25);
    const secondProduct = createProduct('product-2', 40);

    service.addItem(firstProduct);
    service.addItem(secondProduct);
    service.removeItem(firstProduct.id);

    expect(service.items()).toEqual([{ product: secondProduct, quantity: 1 }]);
    expect(service.itemCount()).toBe(1);
    expect(service.total()).toBe(40);
  });

  it('should update quantity for an existing item and remove it when quantity is zero or less', () => {
    const product = createProduct();

    service.addItem(product);
    service.updateQuantity(product.id, 3);

    expect(service.items()).toEqual([{ product, quantity: 3 }]);
    expect(service.itemCount()).toBe(3);
    expect(service.total()).toBe(75);

    service.updateQuantity(product.id, 0);

    expect(service.items()).toEqual([]);
    expect(service.itemCount()).toBe(0);
    expect(service.total()).toBe(0);
  });

  it('should clear items and set shipping method', () => {
    const product = createProduct();
    const shippingMethod: ShippingMethod = 'certified';

    service.addItem(product);
    service.setShipping(shippingMethod);
    service.clear();

    expect(service.items()).toEqual([]);
    expect(service.itemCount()).toBe(0);
    expect(service.total()).toBe(0);
    expect(service.shipping()).toBe(shippingMethod);
  });
});
