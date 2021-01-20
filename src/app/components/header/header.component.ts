import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrdersService } from 'src/app/shareds/services/orders.service';
import { IProduct } from 'src/app/shareds/interfaces/product.interface';
import { AuthService } from 'src/app/shareds/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  myBasket: Array<IProduct> = [];
  totalPrice: number = 0;
  statusLogin: boolean;
  urlLogin: string;
  pageLogin: string;

  modalRef: BsModalRef;
  login:string;
  password:string;

  constructor(private orderService: OrdersService, private auth: AuthService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage();
    this.checkUser();
    this.checkLocalUser();
  }

  private checkBasket(): void {
    this.orderService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.myBasket = JSON.parse(localStorage.getItem('products'));
      this.totalPrice = this.myBasket.reduce((total, product) => total + (product.price * product.count), 0);
    }
  }
  private checkUser(): void {
    this.auth.userStatusChanges.subscribe(
      () => {
        this.checkLocalUser();
      }
    )
  }
  private checkLocalUser():void{
    const user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
      if (user.role === "admin") {
        this.urlLogin = 'admin';
        this.pageLogin = 'admin';
      } else {
        this.urlLogin = 'profile';
        this.pageLogin = 'profile';
      }
      this.statusLogin = true;
    } else {
      this.statusLogin = false;
      this.urlLogin = '';
      this.pageLogin = '';
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  signIn(): void {
    this.auth.signIn(this.login, this.password);
    this.resetForm();
  }

  signUp(): void {
    this.auth.signUp(this.login, this.password);
    this.resetForm();
  }
  private resetForm(): void {
    this.login = '';
    this.password = '';
    this.modalRef.hide();
  }
}
