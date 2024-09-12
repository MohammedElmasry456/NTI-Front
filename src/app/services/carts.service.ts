import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { Coupon } from '../interfaces/coupon';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  hostName:string = "";
  routeName:string = "";

  constructor(private _HttpClient:HttpClient,private _GlobalService:GlobalService) {
    this.hostName=this._GlobalService.hostName;
    this.routeName = this._GlobalService.cartRoute;
  }

  addToCart(product:string):Observable<any>
  {
    return this._HttpClient.post(`${this.hostName}${this.routeName}`,{product},{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}});
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routeName}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  removeFromCart(itemId: string): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routeName}/${itemId}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  applyCoupon(formData: Coupon): Observable<any> {
    return this._HttpClient.put(`${this.hostName}${this.routeName}/applyCoupon`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  updateProductQuantity = (
    product: string,
    quantity: number
  ): Observable<any> => {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${product}`,
      { quantity: quantity },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  };
}
