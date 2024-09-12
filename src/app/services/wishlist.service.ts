import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  hostName:string = "";
  routeName:string = "";

  constructor(private _HttpClient:HttpClient,private _GlobalService:GlobalService) {
    this.hostName = _GlobalService.hostName;
    this.routeName = _GlobalService.wishlistRoute;
   }

  addToWishlist(product:string):Observable<any>
  {
    return this._HttpClient.post(`${this.hostName}${this.routeName}`,{product},{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}});
  }

  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  removeFromWishlist(itemId: string): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routeName}/${itemId}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  };

}
