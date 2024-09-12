import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  hostName:string = "";
  routeName:string = "";
  imgDomain:string = "";
  constructor(private _HttpClient:HttpClient,private _GlobalService:GlobalService) {
    this.hostName=this._GlobalService.hostName;
    this.routeName = this._GlobalService.productsRoute;
    this.imgDomain = this._GlobalService.productsImages;
  }

  getProducts(limit: number = 16, page: number = 1, price:number=100000,sort: string = '-createdAt', ratingAverage:number=0,search: string,category:string):Observable<any>
  {
    if(category == '')
    {
      return this._HttpClient.get(`${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&price[lt]=${price}&ratingAverage[gt]=${ratingAverage}&search=${search}`);

    }
    return this._HttpClient.get(`${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&price[lt]=${price}&ratingAverage[gt]=${ratingAverage}&search=${search}&category=${category}`);

  }

  getDetails(id:string):Observable<any>{
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${id}`)
  }


}
