import { IProduct } from './product.interface';

export interface IOrder {
    id: string;
    userName: string;
    userPhone: string;
    userCity: string;
    userStreet: string;
    userHouse: string;
    ordersDetails: Array<IProduct>;
    totalPayment: number;
    orderDate: number;
    userComment: string;
    orderStatus: boolean;
}