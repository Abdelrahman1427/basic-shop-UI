import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common'; // Import CommonModule
                                    
@Component({
  selector: 'app-cart-crud',
  standalone: true, // Mark as standalone component
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './cart-crud.component.html',
  styleUrls: ['./cart-crud.component.css']
})
export class CartCrudComponent implements OnInit {  
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  editCartItem(cartItem: CartItem): void {
    // Open a modal or navigate to a form to edit the selected cart item
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.loadCartItems();
    });
  }

  checkout(): void {
    // Implement checkout functionality
  }
}
