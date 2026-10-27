import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  product = { name: '', brand: '', price: 0, category: '', description: '', image_link: '' };

  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
    this.productService.addProduct(this.product).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (error) => console.error('Error', error),
    });
  }
}