export type ProductStatus = 'active' | 'out_of_stock' | 'draft';

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
  readonly category: string;
  readonly price: number;
  readonly stock: number;
  readonly status: ProductStatus;
  readonly imageUrl?: string;
}
