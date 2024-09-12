import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DescriptionPipe } from '../pipes/description.pipe';
import { AuthService } from '../services/auth.service';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,DescriptionPipe],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss',

})
export class BestSellersComponent implements OnInit,OnDestroy {

  constructor(private _ProductsService: ProductsService,private _AuthService:AuthService,private _CartsService:CartsService) {}

  products: any[] = [];
  img:string = '';
  subscribe:any;

  ngOnInit() {
      this.subscribe = this._ProductsService.getProducts(16,1,undefined,'-sold',-1,'','').subscribe((res) => {
      this.products = res.data;
      this.img = this._ProductsService.imgDomain;
    });
  }

  addToCart(productID:string)
{
  this._CartsService.addToCart(productID).subscribe((res)=>{
    alert('Product Added to cart')
  })
}


  ngOnDestroy()
  {
    this.subscribe.unsubscribe();
  }
}
