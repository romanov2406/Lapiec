import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/admin-category.interface';
import { IIngredients } from '../interfaces/ingredients.interface';

export class Product implements IProduct{
    constructor(
        public id: string,
        public category: ICategory,
        public nameUA: string,
        public nameEN: string,
        public description: string,
        public weight: string,
        public price: number,
        public image: string,
        public ingredients?:Array<IIngredients>,
        public count: number = 1,
       
    ){}
       
}