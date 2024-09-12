import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { GlobalService } from '../services/global.service';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';
import { CartsService } from '../services/carts.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  subscription: any;
  imgDomain: string = '';
  cartItems: any[] = [];
  cartLength: number = 0;
  cart: any;
  couponError: string = '';

  constructor(private _GlobalService: GlobalService,private _CartService: CartsService,private _AuthenticationService: AuthService,private _Router: Router,private _OrdersService:OrdersService) {}

  applyCouponForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });
  addressForm = new FormGroup({
    address: new FormControl(null, [Validators.required]),
  });

  loadCart() {
    this.subscription = this._CartService.getUserCart().subscribe((res) => {
      this.cart = res.data;
      this.cartItems = res.data.cartItems;
      this.cartLength = res.data.cartLength;
    });
  }

  increaseQuantity = (product: any, current: number) => {
    this._CartService.updateProductQuantity(product, ++current)
      .subscribe((res) => {
        this.loadCart();
      });
  };
  decreaseQuantity = (product: any, current: number) => {
    if (current == 1) this.removeProductFromCart(product);
    else{
        this._CartService.updateProductQuantity(product, --current)
        .subscribe((res) => {
          this.loadCart();
        });
      }
  };

  removeProductFromCart = (product: any) => {
    this._CartService.removeFromCart(product).subscribe((res) => {
      this.loadCart();
      alert('Product removed from cart');
    });
  };
  applyCoupon = (formData: FormGroup) => {
    this._CartService.applyCoupon(formData.value).subscribe({
      next: (res) => {
        this.loadCart();
        alert('Coupon applied');
      },
      error: (err) => {
        this.couponError = err.error.message;
      },
    });
  };

  clearCart = () => {
    this._CartService.clearCart().subscribe((res) => {
      this.cart = null;
      this.cartItems = [];
    });
  };
  checkout(address:FormGroup) {
    this._OrdersService.createOrder(address.value).subscribe({
      next: (res) => {
        alert('order created');
        this._Router.navigate(['/myOrders']);
      }, error: (err) => { }
    })
  }
  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._GlobalService.productsImages;
    this.loadCart();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
