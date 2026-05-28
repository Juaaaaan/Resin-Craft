import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../models/products/products.model';
import { ProductsService } from '../../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { Badge } from '../ui/badge/badge';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, Badge],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private productService = inject(ProductsService);
  product = input.required<Product>();
  isNew = input<boolean>(false);
  showAddBag = input<boolean>(false);

  addToBag = output<Product>();

  get imageUrl(): string {
    return this.productService.getPrimaryImage(this.product());
  }

  onAddToBag(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.addToBag.emit(this.product());
  }
}
