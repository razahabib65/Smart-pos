import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'page-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  
  // Writable signal for the search query
  public readonly searchQuery = signal<string>('');

  public ngOnInit(): void {
    // Fetch products from API when page loads
    this.productService.loadProducts();
  }

  // Computed signal that filters products based on search
  public readonly filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const allProducts = this.productService.products();
    
    if (!query) return allProducts;
    
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.sku.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  });

  public onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  public deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }
}
