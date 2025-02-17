import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../../core/Model/object-model';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-buyer-dashboad',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dashboad.component.html',
  styleUrl: './buyer-dashboad.component.css'
})
export class BuyerDashboadComponent implements OnInit{
  all_products:any;
  show_Checkout:boolean =false;

  constructor(private router:Router, private customerService:CustomerService, private cartService: CartService){}

  ngOnInit(): void {
 this.getAllProduct()
  }
  
  getAllProduct(){
    this.customerService.allProduct().subscribe(data=>{
      this.all_products = data;
      console.log(this.all_products)
    },error=>{
      console.log("My error", error)
    })
  }

  buyProduct(id:number){
    this.show_Checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }
  addToCart(){
    alert("This is showcase")
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
