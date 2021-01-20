export interface IUser{
    name:string;
    phone:string;
    city:string;
    street: string;
    house:string;
    image:string;
    ordersHistory?:Array<any>
}