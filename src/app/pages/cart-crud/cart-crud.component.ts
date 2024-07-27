import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service'; // Import CartService
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model'; // Import CartItem interface

@Component({
  selector: 'app-cart-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-crud.component.html',
  styleUrls: ['./cart-crud.component.css']
})
export class CartCrudComponent implements OnInit {
  visibleProducts: Product[] = [];
  cart: CartItem[] = []; // Change to use CartItem interface

  constructor(private productService: ProductService, private cartService: CartService) {} // Inject CartService

  ngOnInit(): void {
    this.loadVisibleProducts();
    this.loadCartItems(); // Load existing cart items if needed
  }

  loadVisibleProducts(): void {
    this.productService.getVisibleProducts().subscribe(products => {
      this.visibleProducts = products;
    });
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      id: 0, // If your API generates IDs, set this to 0 or leave it out
      productId: product.id,
      quantity: 1 // Set default quantity to 1
    };

    this.cartService.addToCart(cartItem).subscribe(response => {
      this.cart.push(response); // Push the added item to the cart
      console.log('Item added to cart:', response);
    }, error => {
      console.error('Error adding item to cart:', error);
    });
  }

  removeFromCart(index: number): void {
    const cartItem = this.cart[index];
    this.cartService.removeFromCart(cartItem.id).subscribe(() => {
      this.cart.splice(index, 1); // Remove item from local cart array
    }, error => {
      console.error('Error removing item from cart:', error);
    });
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cart = items; // Load existing cart items
    }, error => {
      console.error('Error loading cart items:', error);
    });
  }
}
