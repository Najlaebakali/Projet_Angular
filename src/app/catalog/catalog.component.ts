

import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Cart, CartItem, Product } from '../core/Model/object-model';
import { ProductService } from '../shared/services/product.service';
import { CustomerService } from '../customer/services/customer.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, matDrawerAnimations } from '@angular/material/sidenav';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { CartService } from '../shared/services/cart.service';
import { StoreService } from '../shared/services/store.service';
import { Subscription } from 'rxjs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetailsComponent } from '../product-details/product-details.component';

//import { TranslateService } from '@ngx-translate/core';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  imports: [RouterLink, RouterOutlet,CommonModule,
     FormsModule,HttpClientModule,RouterModule,MatToolbarModule,MatMenuModule,
     MatBadgeModule,MatIconModule,MatDrawer,MatDrawerContainer,MatDrawerContent
    ,MatGridListModule,ProductDetailsComponent],
    
})
export class CatalogComponent implements OnInit, OnChanges, OnDestroy{

 
  products: Product[] = [];
  cart: Product[] = [];
  selectedProduct: Product | undefined;
  showDescription: boolean = false;
  filteredProducts: Product[] = [];
  cartLoaded: boolean = false;
  
  //selectedCategoryIndex: number | null = null;

  darkMode: boolean = false;


  toggleTheme(event: any): void {
    const themeValue = event.target.value;
    this.darkMode = themeValue === 'dark';
    localStorage.setItem('theme', themeValue);
    this.applyTheme();
  }

  // Applique le thème en fonction de darkMode
 applyTheme(): void {
  const body = document.querySelector('body');
  if (body) {
    if (this.darkMode) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}





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
   // this.products.forEach(product => {
     // product.addedToCart = false;
    //});
    
   // this.loadCart();
  
 /*loadCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.cartLoaded = true;
    });
  }*/
  

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

/*
 addToCart(product: Product) {
    this.cart.push(product);
    product.addedToCart = true;

    if (product.addedToCart) {
      console.log(`Le produit "${product.name}" a été ajouté au panier.`);
    } else {
      console.log(`Impossible d'ajouter le produit "${product.name}" au panier.`);
    }
  }
 
  addToCart(product: Product): void {
    if (!this.cartLoaded) {
      console.log("Veuillez patienter!");
      return;
    }

    this.cartService.addToCart(product);
    //this.router.navigate(['/cart']);
  } 

  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe(
      () => {
        console.log(`Le produit "${product.name}" a été ajouté au panier.`);
      },
      (error) => {
        console.error(`Une erreur s'est produite lors de l'ajout du produit "${product.name}" au panier :`, error);
      }
    );
  }

  

  addToCart(product: Product): void {
    
    const existingProduct = this.cart.find(p => p.id === product.id);
  
    if (existingProduct) {
      
      existingProduct.quantity += 1;
    } else {
      
      this.cart.push({...product, quantity: 1});
    }
  
    this.cartService.addToCart(product).subscribe(
      () => {
        console.log(`Le produit "${product.name}" a été ajouté au panier.`);
      },
      (error) => {
        console.error(`Une erreur s'est produite lors de l'ajout du produit "${product.name}" au panier :`, error);
      }
    );
  }*/
  

  isLowStock(quantity: number): boolean {
    return quantity > 0 && quantity < 5;
  }

  getAvailableProducts(): Product[] {
    return this.products.filter(product => product.quantity > 0);
  }

 
  showProductDetails(product: Product): void {
    this.selectedProduct = product;
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }

  

  keyword: string = '';
  searchProducts(): void {
    if (this.keyword.trim() !== '') {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
   
  

  showNotifications(): void {
   
  }

  
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.imagePath,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
    console.log(`Le produit "${product.name}" a été ajouté au panier.`);
    
  }
 

 
  }


