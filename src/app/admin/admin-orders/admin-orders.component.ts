import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shareds/interfaces/order.interface';
import { OrdersService } from 'src/app/shareds/services/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders:Array<any> = [];

  constructor(private orderService:OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  
  private getOrders(): void {
   this.orderService.getFireBaseOrders().subscribe(actions => {
      this.orders = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }


  public deleteOrder(order:IOrder):void{
    this.orderService.deleteFirebaseOrder(order.id)
    .then(() => console.log('delete blog success'))
    .catch(err => console.log('delete blog error', err));
  }

  onChange(event: any, index: number): void {
    let order = this.orders[index];
    let checkBox = event.target;
    if (checkBox.checked) {
      order.orderStatus = true;
    } else {
      order.orderStatus = false;
    }
  }
}
