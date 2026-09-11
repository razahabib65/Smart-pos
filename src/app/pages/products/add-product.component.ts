import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ProductStatus } from '../../core/models/product.model';

@Component({
  selector: 'page-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  public imageError = false;

  public categories = this.productService.categories;
  public isAddingCategory = signal(false);
  public newCategoryCtrl = new FormControl('', [Validators.required, Validators.minLength(2)]);

  public readonly productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    sku: ['', [Validators.required]],
    category: ['Beverages', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', [Validators.required]] // Will hold base64 string
  });

  public onImageClick(inputElement: HTMLInputElement): void {
    inputElement.click();
  }

  public onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.productForm.patchValue({ imageUrl: e.target?.result as string });
        this.imageError = false;
        this.productForm.get('imageUrl')?.markAsTouched();
      };
      reader.readAsDataURL(file);
    }
  }

  public saveNewCategory(): void {
    if (this.newCategoryCtrl.valid) {
      const cat = this.newCategoryCtrl.value!;
      this.productService.addCategory(cat);
      // Auto-select the newly added category
      this.productForm.patchValue({ category: cat });
      this.isAddingCategory.set(false);
      this.newCategoryCtrl.reset();
    }
  }

  public onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const value = this.productForm.getRawValue();
    this.productService.addProduct({
      name: value.name!,
      sku: value.sku!,
      category: value.category!,
      price: value.price!,
      stock: value.stock!,
      imageUrl: value.imageUrl || undefined
    });

    // Navigate back to products list
    this.router.navigate(['/products']);
  }
}
