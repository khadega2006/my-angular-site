import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home').then(c => c.Home)
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./components/product-list/products.module')
        .then(m => m.ProductsModule)
  },

  {
    path: 'add-product',
    loadComponent: () =>
      import('./components/add-product/add-product').then(c => c.AddProduct)
  },

  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then(c => c.NotFound)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}