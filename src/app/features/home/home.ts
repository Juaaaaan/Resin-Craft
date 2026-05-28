import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Router } from '@angular/router';
import { CategoryTabs } from './components/category-tabs/category-tabs';
import { FeaturedProducts } from './components/featured-products/featured-products';
import { BrandStory } from './components/brand-story/brand-story';
// import { Product } from '../../shared/models/products/products.model';

@Component({
  selector: 'app-home',
  imports: [Hero, CategoryTabs, FeaturedProducts, BrandStory],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  router = inject(Router);

  // onAddToBag(product: Product): void {
  //   // CartService — se implementa en Fase 4
  //   console.warn('Add to bag:', product.name);
  // }
}
