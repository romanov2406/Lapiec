import { ICategory } from '../interfaces/admin-category.interface';

export class Category implements ICategory{
    constructor(
        public id:string,
        public nameUA:string,
        public nameEN:string
    ){}
}