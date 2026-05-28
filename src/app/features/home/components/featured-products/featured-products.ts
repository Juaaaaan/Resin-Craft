import { Component, inject, OnInit, output, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../shared/models/products/products.model';
import { MAGIC_NUMBERS } from '../../../../shared/consts/numbers/numbers.const';
import { ProductCard } from "../../../../shared/components/product-card/product-card";

@Component({
  selector: 'app-featured-products',
  imports: [ProductCard],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
})
export class FeaturedProducts implements OnInit {
  private productService = inject(ProductsService);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  addToBag = output<Product>();

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.productService.getFeaturedProducts(MAGIC_NUMBERS.THREE);
      this.products.set(data);
    } catch (e) {
      this.error.set(`No se pudieron cargar los productos, ${e}`);
    } finally {
      this.loading.set(false);
    }
  }

  onAddToBag(product: Product): void {
    this.addToBag.emit(product);
  }
}
