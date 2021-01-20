import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from 'src/app/shareds/services/admin-products.service';
import { Router, Event, ActivatedRoute, NavigationEnd, } from '@angular/router';
import { IProduct } from 'src/app/shareds/interfaces/product.interface';
import { OrdersService } from 'src/app/shareds/services/orders.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];

  constructor(private prodService: AdminProductsService, private router: Router, private activatedRoute: ActivatedRoute,
    private orderService: OrdersService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        this.getProducts(categoryName);
      }
    })
  }

  ngOnInit(): void {
  }
  private getProducts(categoryName: string = 'pizza') {
    this.prodService.getFireBaseCategoryProducts(categoryName).subscribe(
      data => {
        this.products = data;
      });
  }

  public AddBusket(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      localProducts = JSON.parse(localStorage.getItem('products'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      } else {
        localProducts.push(product);
      }
    } else {
      localProducts.push(product);
    }
    localStorage.setItem('products', JSON.stringify(localProducts));
    product.count = 1;
    this.orderService.basket.next(localProducts);
  }

  public productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else {
      if (product.count > 1) {
        product.count--;
      }
    }
  }
}
