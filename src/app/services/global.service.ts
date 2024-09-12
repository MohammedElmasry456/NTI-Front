import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  hostName: string ='http://localhost:3000/';
  wishlistRoute:string = 'api/v1/wishlist';
  authRoute: string = 'api/v1/auth';
  cartRoute: string = 'api/v1/carts';
  orderRoute: string = 'api/v1/orders';
  categoriesRoute: string = 'api/v1/categories';
  productsRoute: string = 'api/v1/products';
  usersRoute: string = 'api/v1/users';
  reviewsRoute:string = 'api/v1/reviews';
  productsImages: string = `${this.hostName}products/`;
  userImage: string = `${this.hostName}/users/`;
  constructor() { }
}
