import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shareds/services/orders.service';
import { IProduct } from 'src/app/shareds/interfaces/product.interface';

import { trigger, style, animate, transition, } from '@angular/animations';
import { IOrder } from 'src/app/shareds/interfaces/order.interface';
import { Order } from 'src/app/shareds/models/order.model';
import { UserService } from 'src/app/shareds/services/user.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('700ms ease-in', style({ transform: 'translateY(0%)' }))
      ])
    ])
  ]
})
export class BasketComponent implements OnInit {

  orders: Array<IProduct> = [];
  userInfo: any;

  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  userComment: string;
  currentDate: number = Date.now();
  totalPayment: string;
  totalPrice: number;

  constructor(private orderService: OrdersService, private userService: UserService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.checkUser();
  }

  private checkBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.orders = JSON.parse(localStorage.getItem('products'));
    }
    this.total();
  }

  private checkUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'user') {
        this.userService.getOneUserInfo(user.username).subscribe(
          data => {
            this.userInfo = data;
            this.userInfo = this.userInfo[0];
            console.log('user in basket', this.userInfo);
          });
      }
    }
  }

  public orderCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.total();
    this.updateLocalStorage();
  }

  public deleteOrder(product: IProduct) {
    const index = this.orders.findIndex(prod => prod.id === product.id);
    this.orders.splice(index, 1);
    this.total();
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
  }

  private total() {
    this.totalPrice = this.orders.reduce((total, elem) => {
      return total + (elem.price * elem.count);
    }, 0);
  }

  public addOrder(): void {
    const newOrder: IOrder = new Order(null,
      this.userName,
      this.userPhone,
      this.userCity,
      this.userStreet,
      this.userHouse,
      this.orders,
      this.totalPrice,
      this.currentDate,
      this.userComment);
    delete newOrder.id;
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'user') {
        this.userService.updateOrdersHistory(this.orders,this.currentDate)
          .then(() => console.log('add userOrder success'))
          .catch(err => console.log('add userOrder error', err));
      }
    }
    this.orders = [];
    localStorage.setItem('products', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
    this.orderService.addFirebaseOrder(newOrder)
      .then(() => console.log('add order success'))
      .catch(err => console.log('add order error', err));
    this.resetForm();
  }
  private resetForm(): void {
    this.userName = '';
    this.userPhone = '';
    this.userCity = '';
    this.userStreet = '';
    this.userHouse = '';
    this.userComment = '';

  }
}
