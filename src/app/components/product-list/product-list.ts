import { Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { ProductCardComponent } from './product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, NgIf, ProductCardComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  products = signal<any[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load products. Please try again.');
        this.loading.set(false);
      }
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}