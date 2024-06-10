export class User{
  name!:string;
  password!:string;
  uploadPhoto!:string;
  role!:string;
  mobNumber!:string;
  address!:Address;
  gender!:string;
  language!:string;
  email!:string;
  dob!:string;
  agreetc!:boolean;
  age!:number;
  aboutYou!:string;
}
export class Address{
  id!:number;
  addLine1!:string;
  addLine2!:string;
  city!:string;
  state!:string
  zipCode!:number;
}
export class Product{
  id!:number;
  name!:string;
  mrp!:number;
  dp!:number;
  status!:boolean;
  quantity!:number;
  price!:number;
  description!: string;
  imagePath!: string;
  isLowStock:boolean=false;
  category!: string; 
  addedToCart: boolean=false;
  colors!: string[];
  inStock:boolean=true;
  reviews!:string[];
}

export class Order{
  id!:number;
  userId!:number;
  sellerId!:number;
  product!:Product;
  deliveryAddress!:Address;
  contact!:number;
  dateTime!:string;
}
export interface Cart {
  items: Array<CartItem>;
}

export interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}



