import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../core/Model/object-model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,MatDialogModule,HttpClientModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  
  @Input() product!: Product;
  @Input() addedToCart: boolean = false; 
  @Output() buy = new EventEmitter()

  getImageUrl(product: Product){
    return '/assets/' +product.imagePath
  }

  byButtonClicked(product: Product){
    this.buy.emit()
  } 
  isAddedToCart(product: Product): boolean {
    return product.addedToCart;
  }
  

}
