// app.routes.ts
import { Routes } from '@angular/router';
import { ProductCrudComponent } from './pages/product-crud/product-crud.component';
import { CartCrudComponent } from './pages/cart-crud/cart-crud.component';

export const routes: Routes = [
    { path: '', redirectTo: 'stocks', pathMatch: 'full' },
    { path: 'products', component: ProductCrudComponent },
  { path: 'cart', component: CartCrudComponent }
];
