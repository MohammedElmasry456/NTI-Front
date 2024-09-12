import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { CartsService } from '../services/carts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,CommonModule,ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit,OnDestroy{
id:string ='';
img:string = '';
reviewError:string = '';
product:any={};
subscribe:any;

constructor(private _ActivatedRoute:ActivatedRoute,private _ProductsService:ProductsService,private _AuthService:AuthService,private _WishlistService:WishlistService,private _CartsService:CartsService,private _ReviewsService:ReviewsService){}

reviewForm = new FormGroup({
  comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
  rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
})

ngOnInit(): void {
  window.scrollTo(0, 0);
  this.id = this._ActivatedRoute.snapshot.params['id'];
  this.img =  this._ProductsService.imgDomain;
  this.loadProduct();

}

loadProduct()
{
  this.subscribe=this._ProductsService.getDetails(this.id).subscribe((res)=>{
    this.product = res.data;
  })
}
addToWishlist(productID:string)
{
  this._WishlistService.addToWishlist(productID).subscribe((res)=>{
    alert('Product Added to wishlist')
  })
}
addToCart(productID:string)
{
  this._CartsService.addToCart(productID).subscribe((res)=>{
    alert('Product Added to cart')
  })
}

addReview(productId: string, formData: FormGroup) {
  this._ReviewsService.addReview(productId, formData.value).subscribe({
    next: (res) => {
      this.loadProduct();
      alert('Review Added')
    },
    error: (err) => {
      if (err.error.errors) {
        err.error.errors.map((error: any) => {
          if (error.path === 'product') { this.reviewError = error.msg }
        })
      }
      else {
        this.reviewError = `login first to add review`;
      }
    }
  })
}


ngOnDestroy(): void {
  this.subscribe.unsubscribe();

}
}
