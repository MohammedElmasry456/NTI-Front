import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
  { path: 'products/:id', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: 'wishlist',canActivate: [authGuard], loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent) },
  { path: 'myOrders', canActivate: [authGuard], loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
  { path: 'cart',canActivate: [authGuard], loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) },
  { path: 'myReviews', canActivate: [authGuard], loadComponent: () => import('./reviews/reviews.component').then(m => m.ReviewsComponent) },
  { path: 'myReviews/:id', canActivate: [authGuard], loadComponent: () => import('./reviews-update/reviews-update.component').then(m => m.ReviewsUpdateComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'forgetPassword', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'home', component: HomeComponent },
  { path: '**', component: NotfoundComponent },
];
