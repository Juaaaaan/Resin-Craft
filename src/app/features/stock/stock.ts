import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { ProductsService } from '../../core/services/products/products.service';
import { StockItem } from '../../shared/models/products/products.model';

@Component({
  selector: 'app-stock',
  imports: [ProductCard, RouterLink],
  templateUrl: './stock.html',
  styleUrl: './stock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stock {
  private productsService = inject(ProductsService);

  items = signal<StockItem[]>([]);
  isLoading = signal(true);

  constructor() {
    this.loadStock();
  }

  private async loadStock(): Promise<void> {
    this.isLoading.set(true);
    const data = await this.productsService.getAvailableStock();
    this.items.set(data);
    this.isLoading.set(false);
  }
}
