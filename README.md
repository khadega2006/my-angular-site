# Store Manager

A simple Angular e-commerce product management app.
Products are fetched from the DummyJSON API (beauty and skin-care categories).
Users can view products, see product details, add new products (saved in
localStorage) and delete the products they added.

## Features
- Feature Module (ProductsModule) and AppRoutingModule
- Routing with route parameters, wildcard route, routerLink and routerLinkActive
- Component communication with @Input and @Output
- Data binding (interpolation, property, event, two-way)
- Directives: *ngFor, *ngIf, [ngClass]
- Built-in pipes and a custom truncate pipe
- ProductService with Dependency Injection and HttpClient
- Loading and error handling

## Setup
1. `npm install`
2. `ng serve`
3. Open http://localhost:4200

## Build
```bash
ng build
```