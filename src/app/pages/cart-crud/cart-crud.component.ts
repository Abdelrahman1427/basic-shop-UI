import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service'; 
import { CartItem } from '../../models/cart-item.model'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-crud',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include FormsModule here
  templateUrl: './cart-crud.component.html',
  styleUrls: ['./cart-crud.component.css']
})
export class CartCrudComponent implements OnInit {
  visibleProducts: Product[] = [];
  filteredProducts: Product[] = []; // Array to hold filtered products

  cart: CartItem[] = []; 
  productMap: Map<number, Product> = new Map(); // To hold product details for easy access
  filterTerm: string = ''; // Filter term

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadVisibleProducts();
    this.loadCartItems(); 
  }

  loadVisibleProducts(): void {
    this.productService.getVisibleProducts().subscribe(products => {
      this.visibleProducts = products;
      this.filteredProducts = products; // Initialize filtered products

      // Map product IDs to product objects for easy lookup
      this.visibleProducts.forEach(product => this.productMap.set(product.id, product));
    });
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
        id: 0, // Assuming API generates this
        productId: product.id,
        quantity: 1 // Ensure this is > 0
    };

    console.log('Adding to cart:', cartItem); // Log the item being added

    this.cartService.addToCart(cartItem).subscribe(response => {
        this.cart.push(response); // Add the response to the cart
        console.log('Item added to cart:', response);
    }, error => {
        console.error('Error adding item to cart:', error);
        console.log(error.error); // Log detailed error response from server
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
  updateCartItem(cartItem: CartItem): void {
    this.cartService.updateCartItem(cartItem.id, cartItem).subscribe(() => {
        console.log('Cart item updated:', cartItem);
    }, error => {
        console.error('Error updating cart item:', error);
    });
}

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cart = items; // Load existing cart items
    }, error => {
      console.error('Error loading cart items:', error);
    });
  }

  calculateTotalPrice(): number {
    let total = 0;
    this.cart.forEach(item => {
      const product = this.productMap.get(item.productId);
      if (product) {
        total += product.price * item.quantity; // Calculate total for each item
      }
    });
    return total;
  }

    // Method to filter products based on the filter term
    filterProducts(): void {
      this.filteredProducts = this.visibleProducts.filter(product =>
        product.name.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    }

}
