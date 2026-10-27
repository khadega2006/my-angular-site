import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private beautyUrl = 'https://dummyjson.com/products/category/beauty';
  private skinCareUrl = 'https://dummyjson.com/products/category/skin-care';

  constructor(private http: HttpClient) {}

  private getLocalProducts(): any[] {
    try {
      return JSON.parse(localStorage.getItem('myProducts') || '[]');
    } catch {
      return [];
    }
  }

  getProducts(): Observable<any[]> {
    return forkJoin([
      this.http.get<any>(this.beautyUrl),
      this.http.get<any>(this.skinCareUrl)
    ]).pipe(
      map(([beauty, skin]) => {
        const apiProducts = [...beauty.products, ...skin.products].map(p => ({
          ...p,
          name: p.title,
          image_link: p.thumbnail,
          brand: p.brand || p.category
        }));
        return [...apiProducts, ...this.getLocalProducts()];
      })
    );
  }

  getProductById(id: number): Observable<any> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  addProduct(product: any): Observable<any> {
    const products = this.getLocalProducts();
    const newProduct = { ...product, id: Date.now() };
    products.push(newProduct);
    localStorage.setItem('myProducts', JSON.stringify(products));
    return of(newProduct);
  }

  deleteProduct(id: number): Observable<boolean> {
    const products = this.getLocalProducts().filter(p => p.id !== id);
    localStorage.setItem('myProducts', JSON.stringify(products));
    return of(true);
  }
}