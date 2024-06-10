import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../core/Model/object-model';
import { CartService } from '../shared/services/cart.service';
import { StoreService } from '../shared/services/store.service';
import { ProductService } from '../shared/services/product.service';
import { CustomerService } from '../customer/services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule,
    FormsModule,HttpClientModule,RouterModule,MatToolbarModule,MatMenuModule,
    MatBadgeModule,MatIconModule,MatDrawer,MatDrawerContainer,MatDrawerContent
   ,ProductDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy{

  products: Product[] = [];
  cart: Product[] = [];
  selectedProduct: Product | undefined;
  showDescription: boolean = false;
  filteredProducts: Product[] = [];

  

  constructor(private productService: ProductService, private router: Router,
    private cartService: CartService, customerService: CustomerService,
    //private translateService: TranslateService 
    ) 
   { 
     

   }
   

 /*ngOnInit(): void {

    this.productService.getProducts().subscribe((products: Product[]) => {
     this.products = products;
     this.filteredProducts = this.products;
   });
   

  this.cartService.getProductsList().subscribe(products => {
     this.products = products;
     
   });
  
}*/

ngOnInit(): void {
 this.productService.allProduct().subscribe(products => {
   this.products = products;
   this.filteredProducts = this.products;
 });

}
isLowStock(quantity: number): boolean {
  return quantity > 0 && quantity < 5;
}
ngOnChanges(changes: any): void {
  if (changes['selectedProduct'] && !changes['selectedProduct'].firstChange) {
    this.showDescription = true;
  }
  this.products = this.products.filter(product => product.quantity >= 0);
  this.products.forEach(product => {
    product.isLowStock = this.isLowStock(product.quantity);
  });
}

filterProducts(category: string): void {

  this.filteredProducts = this.products.filter(product => product.category === category);

}

ngOnDestroy(): void {
  console.log('Le composant va etre detruit.');
}




  
}
