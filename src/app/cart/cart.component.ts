import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, CartItem } from '../core/Model/object-model';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{

  cart: Cart = { items: [
  

  ] };
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;


  constructor(private cartService: CartService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
  }

  
  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("user_session_id");
  }

  onCheckout(): void {


    /*if (!this.isAuthenticated()) {
      this.router.navigate(['/sign-in']);
      return;
    }*/
    
    this.http.post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_test_51PCiOJ1MF4FyvvCCVfVxe6bbCNMC80zv8MiSeOf2KkEGk7GDSbsIKH2SeUQL0gl73vXBAfGFf0GejkxV79q1aiKC00CJJ1oFFR');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });

      
  }



  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
