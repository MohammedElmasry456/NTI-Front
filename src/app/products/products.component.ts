import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { DescriptionPipe } from '../pipes/description.pipe';
import { CurrencyPipe } from '@angular/common';
import { Pagination } from '../interfaces/pagination';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartsService } from '../services/carts.service';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DescriptionPipe,CurrencyPipe,RouterLink,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private _ProductsService: ProductsService,private _AuthService:AuthService,private _CartsService:CartsService,private _CategoriesService:CategoriesService) {}

  products: any[] = [];
  categories: any[] = [];
  categoryChoice:string='';

  img:string = '';
  subscribe:any;
  search:string='';
  page:number=1;
  pagination:Pagination={};
  priceValue:number = 100000;
  ratingAverage:number = -1;

  loadData(search:string)
  {
    this.search = search;
    this.subscribe = this._ProductsService.getProducts(16,this.page,this.priceValue,undefined,this.ratingAverage,this.search,this.categoryChoice).subscribe((res) => {
      this.products = res.data;
      this.pagination = res.pagination;
      this.img = this._ProductsService.imgDomain;
    })
  }

  changeData(page:number)
  {
    this.page = page;
    this.loadData('');
  }

  addToCart(productID:string)
{
  this._CartsService.addToCart(productID).subscribe((res)=>{
    alert('Product Added to cart')
  })
}

  ngOnInit() {
   this.loadData('');
   this._CategoriesService.getCategories().subscribe({
      next:(res:any)=>{
        this.categories = res.data;
      }
    })
  }

  ngOnDestroy()
  {
    this.subscribe.unsubscribe();
  }
}
