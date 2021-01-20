import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';;
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';


import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminIngredientsComponent } from './admin/admin-ingredients/admin-ingredients.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { DiscountDetailsComponent } from './pages/discount-details/discount-details.component';
import { AuthGuard } from './shareds/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ProfileGuard } from './shareds/guards/profile.guard';


const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path : 'home', component: HomeComponent},
    {path : 'discount', component: DiscountComponent},
    {path : 'discount/:id', component: DiscountDetailsComponent},
    {path : 'menu/:category', component: ProductComponent},
    {path : 'menu/:category/:id', component: ProductDetailsComponent},
    {path : 'payment', component: PaymentComponent},
    {path : 'blog', component: BlogComponent},
    {path : 'basket', component: BasketComponent},
    {path : 'profile', component: ProfileComponent, canActivate: [ProfileGuard]},
    {path : 'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
      {path: '', pathMatch: 'full', redirectTo: 'category'},
      {path : 'category', component: AdminCategoryComponent},
      {path : 'product', component: AdminProductComponent},
      {path : 'ingredients', component: AdminIngredientsComponent},
      {path : 'discount', component: AdminDiscountComponent},
      {path : 'orders', component: AdminOrdersComponent},
      {path : 'blog', component: AdminBlogComponent},
    ]},
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
