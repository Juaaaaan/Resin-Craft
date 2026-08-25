import { ChangeDetectionStrategy, Component, computed, inject, input, output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/products/products.model';
import { ProductsService } from '../../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { Badge } from '../ui/badge/badge';
import { StockStatus } from '../../consts/products/products.const';
import { BadgeVariant } from '../../consts/components/badge/badge.const';

const STOCK_BADGE_MAP: Record<StockStatus, { label: string; variant: BadgeVariant }> = {
  available: { label: 'Disponible', variant: 'primary' },
  reserved: { label: 'Reservado', variant: 'secondary' },
  sold: { label: 'Vendido', variant: 'secondary' },
};

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, Badge, NgOptimizedImage],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  private productService = inject(ProductsService);
  private platformId = inject(PLATFORM_ID);

  product = input.required<Product>();
  isNew = input<boolean>(false);
  showAddBag = input<boolean>(false);
  stockStatus = input<StockStatus | null>(null);

  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  imageUrl = computed(() => this.productService.getPrimaryImage(this.product()));
  stockBadge = computed(() => {
    const status = this.stockStatus();
    return status ? STOCK_BADGE_MAP[status] : null;
  });

  addToBag = output<Product>();

  onAddToBag(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.addToBag.emit(this.product());
  }
}
