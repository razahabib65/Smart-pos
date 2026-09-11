import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { ApiService } from '../api.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly api = inject(ApiService);
  
  // Using signals for local state
  private readonly categoriesSignal = signal<string[]>(['Beverages', 'Equipment', 'Supplies', 'Merchandise']);
  
  public readonly categories = this.categoriesSignal.asReadonly();

  private readonly productsSignal = signal<Product[]>([
    { id: '1', name: 'Premium Coffee Beans', sku: 'COF-001', category: 'Beverages', price: 24.99, stock: 150, status: 'active', imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&q=80' },
    { id: '2', name: 'Ceramic Pour-over Dripper', sku: 'EQP-002', category: 'Equipment', price: 45.00, stock: 32, status: 'active', imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=100&q=80' },
    { id: '3', name: 'Artisan Espresso Cups (Set of 2)', sku: 'EQP-003', category: 'Equipment', price: 35.50, stock: 0, status: 'out_of_stock' },
    { id: '4', name: 'Organic Matcha Powder', sku: 'TEA-001', category: 'Beverages', price: 29.99, stock: 85, status: 'active', imageUrl: 'https://images.unsplash.com/photo-1582782806950-c812166e9270?w=100&q=80' },
    { id: '5', name: 'Digital Coffee Scale', sku: 'EQP-010', category: 'Equipment', price: 65.00, stock: 12, status: 'active' },
    { id: '6', name: 'Oat Milk Barista Edition (Case)', sku: 'BEV-045', category: 'Supplies', price: 42.00, stock: 5, status: 'active' }
  ]);

  // Expose as readonly signal
  public readonly products = this.productsSignal.asReadonly();

  // Computed signal for statistics
  public readonly totalProducts = computed(() => this.productsSignal().length);

  /** Load initial products from the backend */
  public loadProducts(): void {
    this.api.get<Product[]>('products').subscribe({
      next: (products: Product[]) => this.productsSignal.set(products),
      error: (err: unknown) => console.error('Failed to load products', err)
    });
  }

  public addCategory(categoryName: string): void {
    const trimmed = categoryName.trim();
    if (trimmed && !this.categoriesSignal().includes(trimmed)) {
      this.categoriesSignal.update(cats => [...cats, trimmed]);
    }
  }

  public addProduct(product: Omit<Product, 'id' | 'status'>): void {
    const payload = {
      ...product,
      status: 'active'
    };
    
    // Call the backend API via POST /products
    this.api.post<Product>('products', payload).subscribe({
      next: (savedProduct: Product) => {
        // Upon success, update the signal so the UI reflects the new product
        this.productsSignal.update(products => [savedProduct, ...products]);
      },
      error: (err: unknown) => {
        console.error('Failed to add product to backend', err);
        alert('Could not save product. Please try again.');
      }
    });
  }

  public deleteProduct(id: string): void {
    // Call backend API via DELETE /products/:id
    this.api.delete<void>(`products/${id}`).subscribe({
      next: () => {
        this.productsSignal.update(products => products.filter(p => p.id !== id));
      },
      error: (err: unknown) => console.error('Failed to delete product', err)
    });
  }
}
