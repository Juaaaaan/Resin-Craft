import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { Product } from '../../../shared/models/products/products.model';

const mockProductsToTestImages: Product[] = [
  {
    id: 'mock',
    name: 'mock',
    slug: 'mock',
    description: 'mock',
    price: 0,
    is_customizable: false,
    category: null,
    collection: null,
    images: [],
  },
];

describe('ProductsService', () => {
  let service: ProductsService;
  interface MockSupabaseError {
    from: () => {
      select: () => {
        eq: () => {
          order: () => Promise<{ data: null; error: { message: string } }>;
        };
      };
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFeaturedProducts', () => {
    it('should return a list of featured products', async () => {
      const products = await service.getFeaturedProducts();
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
    });
  });

  describe('getAvailableStock', () => {
    it('should return a list of available stock items', async () => {
      const stockItems = await service.getAvailableStock();
      expect(stockItems).toBeDefined();
      expect(Array.isArray(stockItems)).toBe(true);
    });

    it('should return an empty array when supabase returns an error', async () => {
      // mock supabase client to simulate an error response
      (service as unknown as { supabase: MockSupabaseError }).supabase = {
        from: () => ({
          select: () => ({
            eq: () => ({
              order: () => Promise.resolve({ data: null, error: { message: 'test error' } }),
            }),
          }),
        }),
      };

      const stockItems = await service.getAvailableStock();
      expect(stockItems).toBeDefined();
      expect(Array.isArray(stockItems)).toBe(true);
      expect(stockItems.length).toBe(0);
    });
  });

  describe('getPrimaryImage', () => {
    it('should return the primary image URL of a product', () => {
      const product = {
        ...mockProductsToTestImages[0],
        images: [
          { url: 'image1.jpg', is_primary: false, sort_order: 2 },
          { url: 'image2.jpg', is_primary: true, sort_order: 1 },
        ],
      };

      const primaryImageUrl = service.getPrimaryImage(product);
      expect(primaryImageUrl).toBe('image2.jpg');
    });

    it('should return the first image URL if no primary image is set', () => {
      const product = {
        ...mockProductsToTestImages[0],
        images: [
          { url: 'image1.jpg', is_primary: false, sort_order: 2 },
          { url: 'image2.jpg', is_primary: false, sort_order: 1 },
        ],
      };

      const primaryImageUrl = service.getPrimaryImage(product);
      expect(primaryImageUrl).toBe('image1.jpg');
    });

    it('should return an empty string if there are no images', () => {
      const product = {
        ...mockProductsToTestImages[0],
        images: [],
      };

      const primaryImageUrl = service.getPrimaryImage(product);
      expect(primaryImageUrl).toBe('');
    });
  });
});
