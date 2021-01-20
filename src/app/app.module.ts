import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

import { PaymentComponent } from './pages/payment/payment.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BasketComponent } from './pages/basket/basket.component';
import { HttpClientModule } from '@angular/common/http';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminIngredientsComponent } from './admin/admin-ingredients/admin-ingredients.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { HryvniaPipe } from './shareds/pipes/hryvnia.pipe';
import { SearchPipe } from './shareds/pipes/search.pipe';
import { FilterAdminCategoryPipe } from './shareds/pipes/filter-admin-category.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DiscountDetailsComponent } from './pages/discount-details/discount-details.component';
import { FilterAdminDiscountsPipe } from './shareds/pipes/filter-admin-discounts.pipe';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CarouselModule } from 'ngx-bootstrap/carousel';


import { NgxUiLoaderModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './ngxUiLoaderConfig';
import { ProfileComponent } from './profile/profile.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyBTvHGmlCaXBqFBAylxw5xsI3h86tpChb0',
  authDomain: 'trainee-lapiec-14bc2.firebaseapp.com',
  databaseURL: 'https://trainee-lapiec-14bc2.firebaseio.com',
  projectId: 'trainee-lapiec-14bc2',
  storageBucket: 'trainee-lapiec-14bc2.appspot.com',
  messagingSenderId: '809274438249',
  appId: '1:809274438249:web:27354a81d449ae30ec68f8'
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountComponent,
    PaymentComponent,
    BasketComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminOrdersComponent,
    HryvniaPipe,
    SearchPipe,
    FilterAdminCategoryPipe,
    DiscountDetailsComponent,
    FilterAdminDiscountsPipe,
    BlogComponent,
    AdminBlogComponent,
    ProductComponent,
    ProductDetailsComponent,
    AdminIngredientsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
