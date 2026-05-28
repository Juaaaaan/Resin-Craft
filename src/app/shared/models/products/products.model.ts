import { StockStatus } from '../../consts/products/products.const';

export interface ProductImage {
  url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  is_customizable: boolean;
  category: Category | null;
  collection: collection | null;
  images: ProductImage[];
}

export interface StockItem {
  id: string;
  status: StockStatus;
  product: Product;
}

interface Category {
  name: string;
  slug: string;
}

interface collection {
  name: string;
  slug: string;
}
