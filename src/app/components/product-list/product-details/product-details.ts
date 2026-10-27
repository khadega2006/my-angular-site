import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, NgIf, TitleCasePipe } from '@angular/common';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-details',
  imports: [NgIf, CurrencyPipe, TitleCasePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product = signal<any>(null);
  loading = signal(true);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (p) => {
        this.product.set(p);
        this.loading.set(false);
        if (!p) this.errorMessage.set('Product not found');
      },
      error: () => {
        this.errorMessage.set('Failed to load product');
        this.loading.set(false);
      }
    });
  }

  isMine(): boolean {
    return this.product()?.id > 100000;
  }

  deleteProduct() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(this.product().id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}