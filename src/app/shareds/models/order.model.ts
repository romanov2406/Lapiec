import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';

export class Order implements IOrder {
    constructor(
        public id: string,
        public userName: string,
        public userPhone: string,
        public userCity: string,
        public userStreet: string,
        public userHouse: string,
        public ordersDetails: Array<IProduct>,
        public totalPayment: number,
        public orderDate: number,
        public userComment: string = '',
        public orderStatus: boolean = false,
    ) { }
}