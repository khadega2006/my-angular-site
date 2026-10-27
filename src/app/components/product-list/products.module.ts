import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list';
import { ProductCardComponent } from './product-card/product-card';
import { ProductDetails } from './product-details/product-details';

const productRoutes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetails }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    ProductListComponent,
    ProductCardComponent,
    ProductDetails
  ]
})
export class ProductsModule {}