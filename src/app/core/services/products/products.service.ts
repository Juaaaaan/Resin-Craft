import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Product, ProductImage, StockItem } from '../../../shared/models/products/products.model';
import { MAGIC_NUMBERS } from '../../../shared/consts/numbers/numbers.const';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private supabase = inject(SupabaseService).client;

  private readonly PRODUCT_QUERY = `
    *,
    category:categories(name, slug),
    collection:collections(name, slug),
    images:product_images(url, is_primary, sort_order)
  `;

  async getFeaturedProducts(limit = MAGIC_NUMBERS.THREE): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select(this.PRODUCT_QUERY)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return [];
    }
    return data.map(this.normalizeProduct);
  }

  async getAvailableStock(): Promise<StockItem[]> {
    const { data, error } = await this.supabase
      .from('stock_items')
      .select(`*, product:products(${this.PRODUCT_QUERY})`)
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) {
      return [];
    }
    return data;
  }

  private normalizeProduct(p: Product): Product {
    return {
      ...p,
      images: p.images.sort((a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order),
    };
  }

  getPrimaryImage(product: Product): string {
    return (
      product.images.find((i) => i.is_primary)?.url ?? product.images[MAGIC_NUMBERS.ZERO]?.url ?? ''
    );
  }
}
