import { ICategory } from './admin-category.interface';
import { IIngredients } from './ingredients.interface';

export interface IProduct{
    id:string;
    category:ICategory;
    nameUA:string;
    nameEN:string;
    description:string;
    weight:string;
    price:number;
    image?:string;
    ingredients?:Array<IIngredients>
    count:number
}